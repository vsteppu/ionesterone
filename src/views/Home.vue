<script setup>
import { ref } from 'vue';
import { useJobStore } from '@/stores/jobStore';
import { defineProps } from 'vue';

import Search from '@/components/search.vue';
import Scroll from '@/components/scroll.vue';
import Description from '@/components/description.vue';

const props = defineProps(['submit']);

const jobList = ref([]);
const errorMessage = ref('');
const jobDescription = ref('');
const jobGeo = ref('');
const jobIndustry = ref('');
const jobType = ref('');
const jobTitle = ref('');
const visibleJobId = ref(null);
const store = useJobStore();

const handleSearch = async (searchQuery, geo, industry) => {
  try {
    const response = await fetch(`https://jobicy.com/api/v2/remote-jobs?tag=${searchQuery}&geo=${geo}&industry=${industry}`);
    const data = await response.json();
    if (data.jobCount === 0) {
      errorMessage.value = 'Job not found';
      jobList.value = [];
    } else {
      jobList.value = data.jobs;
      errorMessage.value = '';
    }
  } catch (error) {
    errorMessage.value = 'An error occurred. Please try again.';
    console.error(error);
  }
}

const handleJobClick = (job) => {
  if (visibleJobId.value === job.id) {
    visibleJobId.value = null;
    jobDescription.value = null;
  } else {
    visibleJobId.value = job.id;
    jobTitle.value = job.jobTitle
    jobGeo.value = '<b>Location: </b> ' + job.jobGeo;
    jobIndustry.value = '<b>Industry: </b> ' + job.jobIndustry;
    jobType.value = '<b>Type: </b> ' + job.jobType;
    jobDescription.value = job.jobDescription;

  }
};
//jobDescription, jobType, jobIndustry, jobGeo
</script>

<template>
  <div class=" flex justify-center relative top-28 ">
    <div class="py-5 px-16 rounded-lg flex flex-col justify-center bg-gray-100 w-4/5 shadow-xl">
      <h1 class=" text-center font-semibold text-xl m-8 ">Job Search engine</h1>
      <div>
        <Search @submit="handleSearch" />
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <div class="flex">
          <div class="w-2/5 mr-2 ">
            <Scroll v-if="jobList.length" :jobList="jobList" @select="handleJobClick" />
          </div>
          <div class="w-3/5 my-2">
            <Description 
            :visibleJobId="visibleJobId"
            :jobTitle="jobTitle"
            :jobIndustry="jobIndustry"
            :jobType="jobType"
            :jobGeo="jobGeo"
            :jobDescription="jobDescription" 
            />
             <!-- class="rounded-xl bg-gray-200 p-3 "  -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
