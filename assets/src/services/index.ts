import { ServiceGoLiveStage } from "../console/__generated__/graphql";

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
