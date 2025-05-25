import { guidanceContent } from '../config/guidanceContent';

type GuidanceSection = {
  title: string;
  points?: string[];
  items?: string[];
  methods?: Array<{
    title: string;
    description: string;
    examples?: string[];
    points?: string[];
  }>;
  behaviors?: string[];
  steps?: string[];
};

export const formatGuidance = (content: typeof guidanceContent[keyof typeof guidanceContent]) => {
  const formatSection = (section: GuidanceSection): string => {
    let result = `${section.title}\n`;

    if (section.points) {
      result += section.points.map(point => `- ${point}`).join('\n');
    }

    if (section.items) {
      result += section.items.map(item => `  * ${item}`).join('\n');
    }

    if (section.methods) {
      result += section.methods.map(method => {
        let methodText = `- ${method.title}: ${method.description}`;
        if (method.examples) {
          methodText += '\n  ' + method.examples.map(example => `* ${example}`).join('\n  ');
        }
        if (method.points) {
          methodText += '\n  ' + method.points.map(point => `* ${point}`).join('\n  ');
        }
        return methodText;
      }).join('\n');
    }

    if (section.behaviors) {
      result += section.behaviors.map(behavior => `- ${behavior}`).join('\n');
    }

    if (section.steps) {
      result += section.steps.map(step => `- ${step}`).join('\n');
    }

    return result;
  };

  const formatContent = (content: typeof guidanceContent[keyof typeof guidanceContent]['content']) => {
    return Object.entries(content)
      .map(([key, section]) => formatSection(section))
      .join('\n\n');
  };

  return `${content.title}\n\n${formatContent(content.content)}`;
}; 