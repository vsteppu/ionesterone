<script setup>
import { ref, computed, onMounted } from 'vue';
import { useJobStore } from '@/stores/jobStore';

const jobDescription = ref('');
const jobGeo = ref('');
const jobIndustry = ref('');
const jobType = ref('');
const visibleJobId = ref(null);
const store = useJobStore();

const savedJobsList = ref([])

const hasSavedItems = computed(() => savedJobsList.value.length > 0);

const handleJobClick = (job) => {
  if (visibleJobId.value === job.id) {
    visibleJobId.value = null;
    jobDescription.value = '';
  } else {
    visibleJobId.value = job.id;
    console.log(visibleJobId.value)
    jobGeo.value = '<b>Location: </b> ' + job.jobGeo;
    jobIndustry.value = '<b>Industry: </b> ' + job.jobIndustry;
    jobType.value = '<b>Type: </b> ' + job.jobType;
    jobDescription.value = '<b>Job Description: </b>' + job.jobDescription;
  }
};

const getSavedJobs = async () => {
  const savedJobs = await store.checkIfJobIsSaved();
  savedJobsList.value = savedJobs
  console.log(savedJobsList.value)
};

const removeSaved = (jobId) => {
  store.removeJob(jobId);
  savedJobsList.value = savedJobsList.value.filter(job => job.id !== jobId);
};


onMounted(() => {
  getSavedJobs()
}
);
</script>
<template>
  <div class="flex flex-col justify-center items-center relative top-70 inset-0 bg-slate-400 ">
    <div class=" w-4/5 place-items-start bg-gray-100 py-3 px-20 rounded-lg">
      <p class="my-2">Saved items: </p>
      <div v-if="hasSavedItems" class="space-y-3 my-4 ">
        <div v-for="(job, index) in savedJobsList" :key="job.id" class=" bg-gray-200 py-1 px-2 rounded-lg">
          <div>
            {{ job.jobTitle }}
            <div class="my-1">
              <button @click="handleJobClick(job)" class="mr-2 bg-gray-300 py-1 px-4 rounded-lg">
                {{ visibleJobId === job.id ? 'Hide Details' : 'Show Details' }}
              </button>
              <button @click="() => removeSaved(job.id)" class="mr-2 bg-gray-300 py-1 px-4 rounded-lg">Remove</button>
            </div>
          </div>
          <div v-if="visibleJobId === job.id" class="mr-2 bg-gray-300 py-1 px-4 rounded-lg">
            <p class="py-2 font-semibold">Job Details</p>
            <p v-html="jobGeo" class="py-2"></p>
            <p v-html="jobIndustry" class="py-2"></p>
            <p v-html="jobType" class="py-2"></p>
            <p v-html="jobDescription" class="py-2"></p>
          </div>
        </div>
      </div>

      <p v-else>No jobs added</p>

    </div>
  </div>
</template>
