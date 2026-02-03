import { describe, it, expect, beforeEach } from 'vitest';
import { SkillsRepository } from '@/lib/repositories/skills';

describe('SkillsRepository', () => {
  let repository: SkillsRepository;

  beforeEach(() => {
    repository = new SkillsRepository();
  });

  describe('findMany', () => {
    it('should return empty array for no matches', async () => {
      const result = await repository.findMany({
        where: undefined,
        limit: 10,
        offset: 0,
      });
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('findById', () => {
    it('should return undefined for non-existent ID', async () => {
      const result = await repository.findById(999999);
      expect(result).toBeUndefined();
    });
  });

  describe('findBySlug', () => {
    it('should return undefined for non-existent slug', async () => {
      const result = await repository.findBySlug('non-existent-skill');
      expect(result).toBeUndefined();
    });
  });

  describe('create', () => {
    it('should throw error for invalid data', async () => {
      await expect(
        repository.create({} as Parameters<SkillsRepository['create']>[0])
      ).rejects.toThrow();
    });
  });

  describe('getCategories', () => {
    it('should return categories array', async () => {
      const result = await repository.getCategories();
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
