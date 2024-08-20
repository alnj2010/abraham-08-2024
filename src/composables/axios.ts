import axios from 'axios'
import { ref, watchEffect, toValue, type MaybeRefOrGetter } from 'vue'

export function useAxios(url: MaybeRefOrGetter<string>) {
  const data = ref(null)
  const error = ref(null)

  const getData = () => {
    // reset state before fetching..
    data.value = null
    error.value = null

    axios
      .get(toValue(url))
      .then((res) => (data.value = res.data))
      .catch((err) => (error.value = err))
  }

  watchEffect(() => {
    getData()
  })

  return { data, error }
}
