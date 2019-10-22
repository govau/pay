import { ServiceGoLiveStage } from "../__generated__/schema";

export const goLiveStageLabel = (stage: ServiceGoLiveStage) => {
  switch (stage) {
    case ServiceGoLiveStage.NotStarted:
      return "Test";
    case ServiceGoLiveStage.Live:
      return "Live";
    default:
      throw new Error(`Go live stage ${stage} is not implemented`);
  }
};
