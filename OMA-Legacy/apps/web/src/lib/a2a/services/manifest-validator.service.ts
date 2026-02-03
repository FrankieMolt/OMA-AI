import type {
  A2AAgentCard,
  A2AManifestValidationError,
  A2AManifestValidationResult,
  A2AProtocolVersion,
} from '../types';

export class A2AManifestValidator {
  private readonly VALID_PROTOCOL_VERSIONS: A2AProtocolVersion[] = ['1.0.0'];
  private readonly VALID_PRICING_TYPES = ['free', 'per_request', 'per_token', 'subscription'];
  private readonly VALID_PROTOCOLS = ['a2a', 'http', 'websocket', 'sse'];
  private readonly VALID_LICENSES = [
    'MIT',
    'Apache-2.0',
    'GPL-3.0',
    'BSD-3-Clause',
    'ISC',
    'proprietary',
  ];
  private readonly URL_REGEX = /^https?:\/\/.+/;

  /**
   * Validate agent manifest (A2AAgentCard)
   */
  validateManifest(manifest: unknown): A2AManifestValidationResult {
    const errors: A2AManifestValidationError[] = [];
    const warnings: string[] = [];

    // Check if manifest is an object
    if (!manifest || typeof manifest !== 'object') {
      return {
        valid: false,
        errors: [
          {
            field: 'manifest',
            message: 'Manifest must be an object',
            code: 'INVALID_TYPE',
          },
        ],
        warnings: [],
      };
    }

    const card = manifest as Partial<A2AAgentCard>;

    // Validate version
    errors.push(...this.validateVersion(card.version));

    // Validate metadata
    errors.push(...this.validateMetadata(card.metadata));

    // Validate capabilities
    errors.push(...this.validateCapabilities(card.capabilities));

    // Validate pricing
    errors.push(...this.validatePricing(card.pricing));

    // Validate endpoints
    errors.push(...this.validateEndpoints(card.endpoints));

    // Validate performance (if present)
    if (card.performance) {
      errors.push(...this.validatePerformance(card.performance));
    }

    // Validate constraints (if present)
    if (card.constraints) {
      errors.push(...this.validateConstraints(card.constraints));
    }

    // Generate warnings for recommended fields
    warnings.push(...this.generateWarnings(card));

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate protocol version
   */
  private validateVersion(version: unknown): A2AManifestValidationError[] {
    const errors: A2AManifestValidationError[] = [];

    if (!version) {
      errors.push({
        field: 'version',
        message: 'Version is required',
        code: 'REQUIRED_FIELD',
      });
    } else if (typeof version !== 'string') {
      errors.push({
        field: 'version',
        message: 'Version must be a string',
        code: 'INVALID_TYPE',
      });
    } else if (!this.VALID_PROTOCOL_VERSIONS.includes(version as A2AProtocolVersion)) {
      errors.push({
        field: 'version',
        message: `Invalid version. Supported versions: ${this.VALID_PROTOCOL_VERSIONS.join(', ')}`,
        code: 'INVALID_VALUE',
      });
    }

    return errors;
  }

  /**
   * Validate metadata section
   */
  private validateMetadata(metadata: unknown): A2AManifestValidationError[] {
    const errors: A2AManifestValidationError[] = [];

    if (!metadata || typeof metadata !== 'object') {
      errors.push({
        field: 'metadata',
        message: 'Metadata is required and must be an object',
        code: 'REQUIRED_FIELD',
      });
      return errors;
    }

    const meta = metadata as Record<string, unknown>;

    // Validate name
    if (!meta.name || typeof meta.name !== 'string' || meta.name.trim().length === 0) {
      errors.push({
        field: 'metadata.name',
        message: 'Name is required and must be a non-empty string',
        code: 'REQUIRED_FIELD',
      });
    } else if (meta.name.length > 255) {
      errors.push({
        field: 'metadata.name',
        message: 'Name must be 255 characters or less',
        code: 'INVALID_LENGTH',
      });
    }

    // Validate description
    if (
      !meta.description ||
      typeof meta.description !== 'string' ||
      meta.description.trim().length === 0
    ) {
      errors.push({
        field: 'metadata.description',
        message: 'Description is required and must be a non-empty string',
        code: 'REQUIRED_FIELD',
      });
    } else if (meta.description.length > 5000) {
      errors.push({
        field: 'metadata.description',
        message: 'Description must be 5000 characters or less',
        code: 'INVALID_LENGTH',
      });
    }

    // Validate author
    if (!meta.author || typeof meta.author !== 'string' || meta.author.trim().length === 0) {
      errors.push({
        field: 'metadata.author',
        message: 'Author is required and must be a non-empty string',
        code: 'REQUIRED_FIELD',
      });
    }

    // Validate license
    if (!meta.license || typeof meta.license !== 'string') {
      errors.push({
        field: 'metadata.license',
        message: 'License is required and must be a string',
        code: 'REQUIRED_FIELD',
      });
    } else if (!this.VALID_LICENSES.includes(meta.license)) {
      errors.push({
        field: 'metadata.license',
        message: `Invalid license. Supported licenses: ${this.VALID_LICENSES.join(', ')}`,
        code: 'INVALID_VALUE',
      });
    }

    // Validate version
    if (!meta.version || typeof meta.version !== 'string') {
      errors.push({
        field: 'metadata.version',
        message: 'Version is required and must be a string',
        code: 'REQUIRED_FIELD',
      });
    } else if (!/^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$/.test(meta.version)) {
      errors.push({
        field: 'metadata.version',
        message: 'Version must follow semantic versioning (e.g., 1.0.0)',
        code: 'INVALID_FORMAT',
      });
    }

    // Validate homepage
    if (!meta.homepage || typeof meta.homepage !== 'string') {
      errors.push({
        field: 'metadata.homepage',
        message: 'Homepage is required and must be a string',
        code: 'REQUIRED_FIELD',
      });
    } else if (!this.URL_REGEX.test(meta.homepage)) {
      errors.push({
        field: 'metadata.homepage',
        message: 'Homepage must be a valid URL',
        code: 'INVALID_FORMAT',
      });
    }

    // Validate tags (optional)
    if (meta.tags !== undefined) {
      if (!Array.isArray(meta.tags)) {
        errors.push({
          field: 'metadata.tags',
          message: 'Tags must be an array',
          code: 'INVALID_TYPE',
        });
      } else {
        meta.tags.forEach((tag: unknown, index: number) => {
          if (typeof tag !== 'string') {
            errors.push({
              field: `metadata.tags[${index}]`,
              message: 'Each tag must be a string',
              code: 'INVALID_TYPE',
            });
          } else if (tag.length > 50) {
            errors.push({
              field: `metadata.tags[${index}]`,
              message: 'Each tag must be 50 characters or less',
              code: 'INVALID_LENGTH',
            });
          }
        });
      }
    }

    return errors;
  }

  /**
   * Validate capabilities section
   */
  private validateCapabilities(capabilities: unknown): A2AManifestValidationError[] {
    const errors: A2AManifestValidationError[] = [];

    if (!capabilities || typeof capabilities !== 'object') {
      errors.push({
        field: 'capabilities',
        message: 'Capabilities is required and must be an object',
        code: 'REQUIRED_FIELD',
      });
      return errors;
    }

    const caps = capabilities as Record<string, unknown>;

    // Validate protocols
    if (!caps.protocols || !Array.isArray(caps.protocols)) {
      errors.push({
        field: 'capabilities.protocols',
        message: 'Protocols is required and must be an array',
        code: 'REQUIRED_FIELD',
      });
    } else if (caps.protocols.length === 0) {
      errors.push({
        field: 'capabilities.protocols',
        message: 'Protocols array must contain at least one protocol',
        code: 'INVALID_LENGTH',
      });
    } else {
      caps.protocols.forEach((protocol: unknown, index: number) => {
        if (typeof protocol !== 'string') {
          errors.push({
            field: `capabilities.protocols[${index}]`,
            message: 'Each protocol must be a string',
            code: 'INVALID_TYPE',
          });
        } else if (!this.VALID_PROTOCOLS.includes(protocol)) {
          errors.push({
            field: `capabilities.protocols[${index}]`,
            message: `Invalid protocol. Supported: ${this.VALID_PROTOCOLS.join(', ')}`,
            code: 'INVALID_VALUE',
          });
        }
      });
    }

    // Validate models
    if (!caps.models || !Array.isArray(caps.models)) {
      errors.push({
        field: 'capabilities.models',
        message: 'Models is required and must be an array',
        code: 'REQUIRED_FIELD',
      });
    } else if (caps.models.length === 0) {
      errors.push({
        field: 'capabilities.models',
        message: 'Models array must contain at least one model',
        code: 'INVALID_LENGTH',
      });
    } else {
      caps.models.forEach((model: unknown, index: number) => {
        if (typeof model !== 'string') {
          errors.push({
            field: `capabilities.models[${index}]`,
            message: 'Each model must be a string',
            code: 'INVALID_TYPE',
          });
        }
      });
    }

    // Validate tools
    if (!caps.tools || !Array.isArray(caps.tools)) {
      errors.push({
        field: 'capabilities.tools',
        message: 'Tools is required and must be an array',
        code: 'REQUIRED_FIELD',
      });
    } else if (caps.tools.length === 0) {
      errors.push({
        field: 'capabilities.tools',
        message: 'Tools array must contain at least one tool',
        code: 'INVALID_LENGTH',
      });
    } else {
      caps.tools.forEach((tool: unknown, index: number) => {
        if (typeof tool !== 'string') {
          errors.push({
            field: `capabilities.tools[${index}]`,
            message: 'Each tool must be a string',
            code: 'INVALID_TYPE',
          });
        }
      });
    }

    // Validate languages (optional)
    if (caps.languages !== undefined) {
      if (!Array.isArray(caps.languages)) {
        errors.push({
          field: 'capabilities.languages',
          message: 'Languages must be an array',
          code: 'INVALID_TYPE',
        });
      }
    }

    // Validate specializations (optional)
    if (caps.specializations !== undefined) {
      if (!Array.isArray(caps.specializations)) {
        errors.push({
          field: 'capabilities.specializations',
          message: 'Specializations must be an array',
          code: 'INVALID_TYPE',
        });
      }
    }

    return errors;
  }

  /**
   * Validate pricing section
   */
  private validatePricing(pricing: unknown): A2AManifestValidationError[] {
    const errors: A2AManifestValidationError[] = [];

    if (!pricing || typeof pricing !== 'object') {
      errors.push({
        field: 'pricing',
        message: 'Pricing is required and must be an object',
        code: 'REQUIRED_FIELD',
      });
      return errors;
    }

    const price = pricing as Record<string, unknown>;

    // Validate type
    if (!price.type || typeof price.type !== 'string') {
      errors.push({
        field: 'pricing.type',
        message: 'Pricing type is required and must be a string',
        code: 'REQUIRED_FIELD',
      });
    } else if (!this.VALID_PRICING_TYPES.includes(price.type)) {
      errors.push({
        field: 'pricing.type',
        message: `Invalid pricing type. Supported: ${this.VALID_PRICING_TYPES.join(', ')}`,
        code: 'INVALID_VALUE',
      });
    }

    // Validate amount
    if (price.amount === undefined || typeof price.amount !== 'string') {
      errors.push({
        field: 'pricing.amount',
        message: 'Pricing amount is required and must be a string',
        code: 'REQUIRED_FIELD',
      });
    }

    // Validate currency
    if (!price.currency || typeof price.currency !== 'string') {
      errors.push({
        field: 'pricing.currency',
        message: 'Currency is required and must be a string',
        code: 'REQUIRED_FIELD',
      });
    } else if (price.currency.length !== 3) {
      errors.push({
        field: 'pricing.currency',
        message: 'Currency must be a 3-letter ISO 4217 code',
        code: 'INVALID_FORMAT',
      });
    }

    // Validate subscriptionPeriod (required for subscription type)
    if (price.type === 'subscription' && !price.subscriptionPeriod) {
      errors.push({
        field: 'pricing.subscriptionPeriod',
        message: 'Subscription period is required for subscription pricing type',
        code: 'REQUIRED_FIELD',
      });
    }

    return errors;
  }

  /**
   * Validate endpoints section
   */
  private validateEndpoints(endpoints: unknown): A2AManifestValidationError[] {
    const errors: A2AManifestValidationError[] = [];

    if (!endpoints || typeof endpoints !== 'object') {
      errors.push({
        field: 'endpoints',
        message: 'Endpoints is required and must be an object',
        code: 'REQUIRED_FIELD',
      });
      return errors;
    }

    const ends = endpoints as Record<string, unknown>;

    // Validate message endpoint
    if (!ends.message || typeof ends.message !== 'string') {
      errors.push({
        field: 'endpoints.message',
        message: 'Message endpoint is required and must be a string',
        code: 'REQUIRED_FIELD',
      });
    } else if (!this.URL_REGEX.test(ends.message)) {
      errors.push({
        field: 'endpoints.message',
        message: 'Message endpoint must be a valid URL',
        code: 'INVALID_FORMAT',
      });
    }

    // Validate status endpoint (optional)
    if (ends.status !== undefined && typeof ends.status !== 'string') {
      errors.push({
        field: 'endpoints.status',
        message: 'Status endpoint must be a string',
        code: 'INVALID_TYPE',
      });
    } else if (typeof ends.status === 'string' && !this.URL_REGEX.test(ends.status)) {
      errors.push({
        field: 'endpoints.status',
        message: 'Status endpoint must be a valid URL',
        code: 'INVALID_FORMAT',
      });
    }

    // Validate negotiate endpoint (optional)
    if (ends.negotiate !== undefined && typeof ends.negotiate !== 'string') {
      errors.push({
        field: 'endpoints.negotiate',
        message: 'Negotiate endpoint must be a string',
        code: 'INVALID_TYPE',
      });
    } else if (typeof ends.negotiate === 'string' && !this.URL_REGEX.test(ends.negotiate)) {
      errors.push({
        field: 'endpoints.negotiate',
        message: 'Negotiate endpoint must be a valid URL',
        code: 'INVALID_FORMAT',
      });
    }

    return errors;
  }

  /**
   * Validate performance section (optional)
   */
  private validatePerformance(performance: unknown): A2AManifestValidationError[] {
    const errors: A2AManifestValidationError[] = [];

    if (typeof performance !== 'object') {
      errors.push({
        field: 'performance',
        message: 'Performance must be an object',
        code: 'INVALID_TYPE',
      });
      return errors;
    }

    const perf = performance as Record<string, unknown>;

    // Validate avgResponseTime
    if (perf.avgResponseTime !== undefined) {
      if (typeof perf.avgResponseTime !== 'number' || perf.avgResponseTime < 0) {
        errors.push({
          field: 'performance.avgResponseTime',
          message: 'Average response time must be a non-negative number',
          code: 'INVALID_VALUE',
        });
      }
    }

    // Validate successRate
    if (perf.successRate !== undefined) {
      if (typeof perf.successRate !== 'number' || perf.successRate < 0 || perf.successRate > 1) {
        errors.push({
          field: 'performance.successRate',
          message: 'Success rate must be a number between 0 and 1',
          code: 'INVALID_VALUE',
        });
      }
    }

    // Validate uptime
    if (perf.uptime !== undefined) {
      if (typeof perf.uptime !== 'number' || perf.uptime < 0 || perf.uptime > 1) {
        errors.push({
          field: 'performance.uptime',
          message: 'Uptime must be a number between 0 and 1',
          code: 'INVALID_VALUE',
        });
      }
    }

    // Validate totalTasks
    if (perf.totalTasks !== undefined) {
      if (typeof perf.totalTasks !== 'number' || perf.totalTasks < 0) {
        errors.push({
          field: 'performance.totalTasks',
          message: 'Total tasks must be a non-negative number',
          code: 'INVALID_VALUE',
        });
      }
    }

    return errors;
  }

  /**
   * Validate constraints section (optional)
   */
  private validateConstraints(constraints: unknown): A2AManifestValidationError[] {
    const errors: A2AManifestValidationError[] = [];

    if (typeof constraints !== 'object') {
      errors.push({
        field: 'constraints',
        message: 'Constraints must be an object',
        code: 'INVALID_TYPE',
      });
      return errors;
    }

    const cons = constraints as Record<string, unknown>;

    // Validate maxTokens
    if (cons.maxTokens !== undefined) {
      if (typeof cons.maxTokens !== 'number' || cons.maxTokens <= 0) {
        errors.push({
          field: 'constraints.maxTokens',
          message: 'Max tokens must be a positive number',
          code: 'INVALID_VALUE',
        });
      }
    }

    // Validate maxDuration
    if (cons.maxDuration !== undefined) {
      if (typeof cons.maxDuration !== 'number' || cons.maxDuration <= 0) {
        errors.push({
          field: 'constraints.maxDuration',
          message: 'Max duration must be a positive number',
          code: 'INVALID_VALUE',
        });
      }
    }

    // Validate maxConcurrentTasks
    if (cons.maxConcurrentTasks !== undefined) {
      if (typeof cons.maxConcurrentTasks !== 'number' || cons.maxConcurrentTasks <= 0) {
        errors.push({
          field: 'constraints.maxConcurrentTasks',
          message: 'Max concurrent tasks must be a positive number',
          code: 'INVALID_VALUE',
        });
      }
    }

    // Validate supportedFormats
    if (cons.supportedFormats !== undefined) {
      if (!Array.isArray(cons.supportedFormats)) {
        errors.push({
          field: 'constraints.supportedFormats',
          message: 'Supported formats must be an array',
          code: 'INVALID_TYPE',
        });
      }
    }

    return errors;
  }

  /**
   * Generate warnings for recommended fields
   */
  private generateWarnings(card: Partial<A2AAgentCard>): string[] {
    const warnings: string[] = [];

    // Warn about missing performance metrics
    if (!card.performance) {
      warnings.push('Performance metrics are recommended for better agent discovery');
    }

    // Warn about missing constraints
    if (!card.constraints) {
      warnings.push('Constraints are recommended to clarify agent capabilities and limitations');
    }

    // Warn about missing languages
    if (!card.capabilities?.languages || card.capabilities.languages.length === 0) {
      warnings.push('Specifying supported languages is recommended for better matching');
    }

    // Warn about missing specializations
    if (!card.capabilities?.specializations || card.capabilities.specializations.length === 0) {
      warnings.push('Specifying specializations is recommended for better discovery');
    }

    // Warn about missing negotiate endpoint
    if (!card.endpoints?.negotiate) {
      warnings.push('Negotiate endpoint is recommended for A2A protocol compliance');
    }

    // Warn about missing status endpoint
    if (!card.endpoints?.status) {
      warnings.push('Status endpoint is recommended for A2A protocol compliance');
    }

    return warnings;
  }

  /**
   * Quick validation check (returns only validity)
   */
  isValid(manifest: unknown): boolean {
    const result = this.validateManifest(manifest);
    return result.valid;
  }
}

// Export singleton instance
export const a2aManifestValidator = new A2AManifestValidator();
