import { defineStore } from "pinia";
import { useAuthStore } from "./authStore";
import { db } from "@/firebase/Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, watch } from "vue"; // Make sure to import ref

export const useJobStore = defineStore("jobStore", () => {
  // States
  const authUser = useAuthStore();
  const user = authUser.user;
  const userId = user.uid;
  const savedItems = ref([]);
  const userRef = doc(db, 'users', userId);

  // Actions  
    const checkJobExistance = async (job) => {
      if (user) {
        const userDoc = await getDoc(userRef);
        const savedJobs = userDoc.exists() ? userDoc.data().savedJobs || [] : [];
        const jobExists = savedJobs.some(savedJobsId =>savedJobsId.id === job.id )
        console.log(jobExists)
        return jobExists
      }
      return false
    };
  
    const saveJobForUser = async (job) => {
      const jobexists = await checkJobExistance(job)
      if (!jobexists) {
        const userDoc = await getDoc(userRef);
        const savedJobs = userDoc.exists() ? userDoc.data().savedJobs || [] : [];
        savedJobs.push(job);
        await setDoc(userRef, { savedJobs }, { merge: true });
        console.log({ savedJobs })
        //      savedItems.value = savedJobs
      }
    }

  const getSavedJobsForUser = async () => {
    if (user){
      const userDoc = await getDoc(userRef);
      const checkexistance = userDoc.exists() ? userDoc.data().savedJobs || [] : [];
      console.log(checkexistance)
      return savedItems.value = checkexistance
    }
      
    return [];
  };

  const loadSavedJobs = async () => {
      savedItems.value = await getSavedJobsForUser();
  };

  const removeSaved = async (jobId) => {
    if (user) {
      const userDoc = await getDoc(userRef);
      const savedJobs = userDoc.exists() ? userDoc.data().savedJobs || [] : [];
      const updatedJobs = savedJobs.filter(savedJob => savedJob.id !== jobId);
      console.log(updatedJobs)

      // Update the document in Firestore with the new list
      await setDoc(userRef, { savedJobs: updatedJobs }, { merge: true });

      // Update the local state
      savedItems.value = updatedJobs; // If you want to keep savedItems in sync
    }
  };
  return {
    savedItems,
    checkJobExistance,
    saveJobForUser,
    getSavedJobsForUser,
    loadSavedJobs,
    removeSaved,
  }
})
