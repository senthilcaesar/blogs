import { AiAgentsMasteryArticle } from './AiAgentsMasteryArticle';
import { EricMosleyArticle } from './EricMosleyArticle';
import { ExportPlatformsArticle } from './ExportPlatformsArticle';
import { SerumCholesterolArticle } from './SerumCholesterolArticle';
import { SuccessfulInterviewArticle } from './SuccessfulInterviewArticle';
import { WhatsNextArticle } from './WhatsNextArticle';

export const articleRegistry = {
  'ai-agents-mastery': AiAgentsMasteryArticle,
  'successful-interview': SuccessfulInterviewArticle,
  'whats-next': WhatsNextArticle,
  'serum-cholesterol': SerumCholesterolArticle,
  'eric-mosley-interview': EricMosleyArticle,
  'export-platforms': ExportPlatformsArticle,
};
