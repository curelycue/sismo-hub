
import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const snapshotProvider = new dataProviders.SnapshotProvider();
    const restProvider = new dataProviders.RestProvider();
    
    const snapshotProviderData0 = await snapshotProvider.querySpaceVoters({
      space: "orangedaoxyz.eth"
    });
    
    const restProviderData1 = await restProvider.getAccountsFromAPI({
      url: "http://18.224.220.100:1880/orangeContributors"
    });
    
    const dataUnion = dataOperators.Union([ 
      snapshotProviderData0,
      restProviderData1 
    ]);

    return [
      {
        name: "orange-dao-contributors",
        timestamp: context.timestamp,
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
