import { Job } from "src/domain/job.domain";

export const countTagNamesFromJobs = (jobs: Job[]) => {
    const tagsReps = new Map<string, number>();

    for(let job of jobs){
        for(let tag of job.attributes.tags.data){
            if(tagsReps.has(tag.attributes.name)){
                tagsReps.set(tag.attributes.name, tagsReps.get(tag.attributes.name) + 1);
            }else{
                tagsReps.set(tag.attributes.name, 1);
            }
        }
    }
    return Object.fromEntries(new Map([...tagsReps.entries()].sort((a, b) => b[1] - a[1])));
    
}