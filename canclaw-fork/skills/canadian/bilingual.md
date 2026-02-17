# Bilingual Translation Skill

**Skill ID**: `canadian.bilingual`  
**Version**: 1.0.0  
**Author**: CanClaw Team  
**Canadian**: ✅ Yes - English/French bilingual support  
**Sovereignty**: ✅ Fully sovereign - Local processing  

---

## Description

Provides bilingual translation and dual-language responses for English and French. This skill enables CanClaw to serve both English and French-speaking Canadians.

## Features

- ✅ **Auto-detect language**: Automatically detects user's language
- ✅ **Bidirectional**: English ↔ French
- ✅ **Canadian French**: Understands Quebec expressions
- ✅ **Context-aware**: Maintains context across translations
- ✅ **Dual output**: Can provide bilingual responses

## Usage

### Basic Translation

```
translate "Hello, how are you?" to French
```

```
traduire "Bonjour, comment ça va?" en anglais
```

### Bilingual Response

```
bilingual: What is the capital of Canada?
```

### Language Detection

```
detect language: Bonjour, comment allez-vous?
```

## Examples

### Example 1: Translation (EN → FR)

**User**: Translate "I would like to order a coffee" to French

**CanClaw**:
```
English: I would like to order a coffee
French: Je voudrais commander un café

Note: This is a polite way to order in Quebec. For a more casual approach, you could say "Je vas prendre un café" (I'll have a coffee).
```

### Example 2: Translation (FR → EN)

**User**: Traduire "Je suis tanné d'attendre" en anglais

**CanClaw**:
```
Français: Je suis tanné d'attendre
English: I'm fed up with waiting

Note: "Tanné" is a Quebec expression meaning "fed up" or "annoyed" - not commonly used in France.
```

### Example 3: Bilingual Response

**User**: bilingual: How do I apply for a passport?

**CanClaw**:
```
## Passport Application

To apply for a Canadian passport:

1. Complete the application form (PPTC 153 for adults)
2. Provide proof of Canadian citizenship
3. Provide valid identification
4. Submit two identical passport photos
5. Pay the application fee
6. Mail your application or visit a Service Canada centre

Processing time: 10-20 business days

---

## Demande de passeport

Pour demander un passeport canadien:

1. Remplissez le formulaire de demande (PPTC 153 pour les adultes)
2. Fournissez une preuve de citoyenneté canadienne
3. Fournissez une pièce d'identité valide
4. Soumettez deux photos de passeport identiques
5. Payez les frais de demande
6. Postulez par la poste ou visitez un centre Service Canada

Délai de traitement: 10-20 jours ouvrables
```

### Example 4: Quebec French

**User**: What does "C'est pasgrave" mean?

**CanClaw**:
```
"C'est pasgrave" (often written as "C'est pas grave") is a Quebec French expression meaning:

- "It's not serious" 
- "It's no big deal"
- "Don't worry about it"

This is very commonly used in Quebec and is more casual than the standard French "Ce n'est pas grave".

Example usage:
  Person A: "Désolé, je suis en retard!" (Sorry I'm late!)
  Person B: "C'est pasgrave!" (No problem!)
```

## Canadian French Expressions

Here are some common Quebec expressions:

| Quebec French | Standard French | English |
|---------------|-----------------|---------|
| C'est pasgrave | Ce n'est pas grave | It's no big deal |
| Je suis tanné | Je suis fatigué | I'm fed up/tired |
| C'est correct | C'est bon | It's okay |
| Ça fait du sens | Ça a du sens | That makes sense |
| Un char | Une voiture | A car |
| Une sortie | Une sortie | An exit |
| Un breuvage | Une boisson | A beverage |
| Magasiner | Faire du shopping | To shop |

## Language Detection

The skill uses pattern matching to detect language:

```typescript
function detectLanguage(text: string): 'en' | 'fr' | 'unknown' {
  const frenchPatterns = [
    /\b(le|la|les|un|une|des)\b/i,
    /\b(et|ou|mais|donc)\b/i,
    /\b(je|tu|il|elle|nous|vous)\b/i,
    /\b(c'est|qu'est-ce)\b/i,
    /\b(bonjour|salut|merci)\b/i,
  ];
  
  const englishPatterns = [
    /\b(the|a|an)\b/i,
    /\b(and|or|but|so)\b/i,
    /\b(I|you|he|she|we|they)\b/i,
    /\b(it's|what's)\b/i,
    /\b(hello|hi|thanks)\b/i,
  ];
  
  // Count matches for each language
  // Return the language with more matches
}
```

## Dual-Language Mode

When `BILINGUAL_MODE=true` in `.env`:

```typescript
async function generateBilingualResponse(
  query: string,
  response: string
): Promise<{ en: string; fr: string }> {
  const detectedLang = detectLanguage(query);
  
  if (detectedLang === 'en') {
    return {
      en: response,
      fr: await translate(response, 'en', 'fr'),
    };
  } else {
    return {
      en: await translate(response, 'fr', 'en'),
      fr: response,
    };
  }
}
```

## Best Practices

### 1. Respect User Preference
If user speaks English, respond in English. If French, respond in French.

### 2. Offer Bilingual When Appropriate
For official information (government services, etc.), offer both languages.

### 3. Explain Quebec Expressions
When using Quebec French, explain if the audience might not understand.

### 4. Use Proper Accents
Always use proper French accents: é, è, ê, ë, à, â, ç, î, ï, ô, ù, û.

## Privacy & Sovereignty

✅ **Local processing** - Translations done locally with Ollama  
✅ **No external APIs** - No Google Translate or DeepL  
✅ **Bilingual memory** - Can store memories in both languages  
✅ **PIPEDA compliant** - Canadian privacy law  

## Limitations

- Translation quality depends on Ollama model
- Quebec French nuances may not always be perfect
- Legal/medical translations should be reviewed by professionals

## See Also

- [Environment Canada Weather Skill](./weather.md)
- [Metric Conversion Skill](./metric.md)

---

*CanClaw: Empowering Canadians with sovereign AI 🦞🇨🇦*
