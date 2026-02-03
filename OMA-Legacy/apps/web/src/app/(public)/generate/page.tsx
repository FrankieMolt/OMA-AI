'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Bot, Cpu, Zap, Workflow, Sparkles, Loader2, Github } from 'lucide-react';
import { toast } from 'sonner';
import strings from '@/constants/text.json';

export default function GeneratePage() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [importMode, setImportMode] = useState<'generate' | 'github'>('generate');
  const [githubUrl, setGithubUrl] = useState('');
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    description: '',
    requirements: '',
  });

  const [generatedContent, setGeneratedContent] = useState('');

  const handleGenerate = async () => {
    if (!formData.type || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setGeneratedContent('');
    
    try {
      const prompt = `Generate a ${formData.type} named "${formData.name}" that does: ${formData.description}. ${formData.requirements ? `Requirements: ${formData.requirements}` : ''}. Return the response as a single markdown file with a README and implementation details/code.`;

      const response = await fetch('/api/llm/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are an expert AI developer specializing in MCP, Agents, and Workflows.' },
            { role: 'user', content: prompt }
          ],
          stream: true
        }),
      });

      if (!response.ok) throw new Error('Generation failed');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No stream available');

      setStep(2);
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = new TextDecoder().decode(value);
        setGeneratedContent(prev => prev + text);
      }
      
      toast.success('Asset generated successfully!');
    } catch (error) {
      console.error(error);
      // Fallback for demo if API fails
      setGeneratedContent(`# ${formData.name}\n\n${formData.description}\n\n## Implementation\n\n\`\`\`typescript\n// Generated boilerplate for ${formData.type}\nconsole.log("Hello World");\n\`\`\``);
      setStep(2);
      toast.warning('Using offline fallback (API unavailable)');
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    if (!githubUrl) {
      toast.error('Please enter a valid GitHub URL');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/listings/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: githubUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Import failed');
      }

      setFormData({
        type: data.data.category,
        name: data.data.title,
        description: data.data.description,
        requirements: `Imported from ${githubUrl}. Capabilities: ${data.data.capabilities.join(', ')}`,
      });
      
      setStep(2);
      toast.success('Asset imported successfully from GitHub!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to import asset');
    } finally {
      setLoading(false);
    }
  };

  const assetTypes = [
    { id: 'agent', label: strings.generate.asset_types.agent.label, icon: Bot, description: strings.generate.asset_types.agent.desc },
    { id: 'subagent', label: strings.generate.asset_types.subagent.label, icon: Bot, description: strings.generate.asset_types.subagent.desc },
    { id: 'mcp', label: strings.generate.asset_types.mcp.label, icon: Cpu, description: strings.generate.asset_types.mcp.desc },
    { id: 'skill', label: strings.generate.asset_types.skill.label, icon: Zap, description: strings.generate.asset_types.skill.desc },
    { id: 'workflow', label: strings.generate.asset_types.workflow.label, icon: Workflow, description: strings.generate.asset_types.workflow.desc },
    { id: 'n8n', label: strings.generate.asset_types.n8n.label, icon: Workflow, description: strings.generate.asset_types.n8n.desc },
    { id: 'x402', label: strings.generate.asset_types.x402.label, icon: Sparkles, description: strings.generate.asset_types.x402.desc },
  ];

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full translate-y-1/2 pointer-events-none" />

      <div className="relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
            {strings.generate.title}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {strings.generate.subtitle}
          </p>
        </div>

        {step === 1 ? (
        <div className="space-y-6">
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={importMode === 'generate' ? 'default' : 'outline'}
              onClick={() => setImportMode('generate')}
              className={
                importMode === 'generate'
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  : 'border-border/60 hover:bg-foreground/5'
              }
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {strings.generate.buttons.generate}
            </Button>
            <Button
              variant={importMode === 'github' ? 'default' : 'outline'}
              onClick={() => setImportMode('github')}
              className={
                importMode === 'github'
                  ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                  : 'border-border/60 hover:bg-foreground/5'
              }
            >
              <Github className="w-4 h-4 mr-2" />
              {strings.generate.buttons.import}
            </Button>
          </div>

          <Card className="glass-card border-border/60">
            <CardHeader>
              <CardTitle>{importMode === 'generate' ? strings.generate.cards.generator.title : strings.generate.cards.importer.title}</CardTitle>
              <CardDescription>
                {importMode === 'generate' 
                  ? strings.generate.cards.generator.desc
                  : strings.generate.cards.importer.desc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {importMode === 'generate' ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {assetTypes.map((type) => (
                      <div
                        key={type.id}
                        onClick={() => setFormData({ ...formData, type: type.id })}
                        className={`cursor-pointer p-4 rounded-xl border transition-all ${
                          formData.type === type.id
                            ? 'bg-primary/10 border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.2)]'
                            : 'bg-foreground/[0.04] border-border/60 hover:bg-foreground/[0.08] hover:border-primary/20'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`p-2 rounded-lg ${
                              formData.type === type.id
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-foreground/10 text-muted-foreground'
                            }`}
                          >
                            <type.icon className="w-5 h-5" />
                          </div>
                          <span
                            className={`font-semibold ${formData.type === type.id ? 'text-primary' : 'text-foreground'}`}
                          >
                            {type.label}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground pl-[52px]">{type.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{strings.generate.form.name_label}</Label>
                      <Input
                        id="name"
                        placeholder={strings.generate.form.name_placeholder}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="glass-input"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">{strings.generate.form.desc_label}</Label>
                      <Textarea
                        id="description"
                        placeholder={strings.generate.form.desc_placeholder}
                        className="min-h-[150px] glass-input"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={loading || !formData.type || !formData.description}
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-info hover:from-primary/80 hover:to-info/80 text-primary-foreground shadow-lg shadow-primary/20"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        {strings.generate.form.btn_generating}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        {strings.generate.form.btn_generate}
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="github-url">{strings.generate.form.github_label}</Label>
                    <div className="relative">
                      <Github className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="github-url"
                        placeholder={strings.generate.form.github_placeholder}
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        className="pl-10 h-12 glass-input"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground/80">
                      {strings.generate.form.github_hint}
                    </p>
                  </div>

                  <Button
                    onClick={handleImport}
                    disabled={loading || !githubUrl}
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-accent to-info hover:from-accent/80 hover:to-info/80 text-accent-foreground shadow-lg shadow-accent/20"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        {strings.generate.form.btn_analyzing}
                      </>
                    ) : (
                      <>
                        <Github className="w-5 h-5 mr-2" />
                        {strings.generate.form.btn_import}
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="glass-card border-border/60">
          <CardHeader>
            <CardTitle className="text-success flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              {importMode === 'generate' ? strings.generate.cards.complete.title_gen : strings.generate.cards.complete.title_imp}
            </CardTitle>
            <CardDescription>
              {importMode === 'generate' 
                ? strings.generate.cards.complete.desc_gen 
                : strings.generate.cards.complete.desc_imp}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-lg bg-foreground/[0.04] border border-border/60 font-mono text-sm text-foreground/80 overflow-x-auto max-h-[500px] overflow-y-auto">
              <pre>{importMode === 'generate' && generatedContent ? generatedContent : `// ${importMode === 'generate' ? 'Generated' : 'Imported'} Configuration
{
  "name": "${formData.name || 'Untitled Asset'}",
  "type": "${formData.type || 'unknown'}",
  "version": "1.0.0",
  "description": "${formData.description?.slice(0, 50) || 'No description'}...",
  "source": "${importMode === 'github' ? githubUrl : 'ai-generated'}",
  "capabilities": [
    "autonomous-execution",
    "context-awareness"
  ],
  "permissions": {
    "network": true,
    "filesystem": false
  }
}`}</pre>
            </div>
            
            <div className="flex gap-4">
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1 border-border/60 hover:bg-foreground/5">
                {strings.generate.form.btn_back}
              </Button>
              <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                {importMode === 'generate' ? strings.generate.form.btn_download : strings.generate.form.btn_publish}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      </div>
    </div>
  );
}
