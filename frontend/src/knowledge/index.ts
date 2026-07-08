import { biologicalNodes } from "./biological";
import { clinicalNodes } from "./clinical";
import { cognitiveNodes } from "./cognitive";
import { developmentalNodes } from "./developmental";
import { personalityNodes } from "./personality";
import { researchNodes } from "./research";
import { rootNodes } from "./root";
import { socialNodes } from "./social";
import { statisticsNodes } from "./statistics";

export { biologicalNodes, clinicalNodes, cognitiveNodes, developmentalNodes, personalityNodes, researchNodes, rootNodes, socialNodes, statisticsNodes };

export const allKnowledgeNodes = [
  ...rootNodes,
  ...cognitiveNodes,
  ...biologicalNodes,
  ...socialNodes,
  ...personalityNodes,
  ...developmentalNodes,
  ...clinicalNodes,
  ...researchNodes,
  ...statisticsNodes,
];
