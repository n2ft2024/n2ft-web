import {useQuery} from 'react-query';

export function useStarRewardsTotalInfo() {
    async function fetchData() {
    }
    return useQuery(['useStarRewardsTotalInfo'], fetchData, {
        // enabled: !!contract,
        // refetchInterval: config.refreshInterval,
    });
}
