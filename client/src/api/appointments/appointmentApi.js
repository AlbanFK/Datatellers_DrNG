
const baseURL = 'http://localhost:5000/api'

export const getAllAppointments =  async () => {
    const response = await  fetch(`${baseURL}/appointment/`)
    
    if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.log(message);
        return;
    }

    const data = await response.json();
    console.log(data.reverse());
    return data
}

export const getOneAppointment =  async (code) => {
    const response = await  fetch(`${baseURL}/appointment/${code}`)
    
    if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.log(message);
        return;
    }

    const data = await response.json();
    console.log(data);
    return data
}


export const newAppointment = async (formData) => {
  let isOK;
    await fetch(baseURL + "/appointment/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(formData),
   })
   .then (response => isOK = response)
   .catch(error => {
     window.alert(error);
     return;
   });
   return isOK
}
export const updateAppointment = async (code, formData) => {
  let isOK;
    await fetch(baseURL + "/update/" + code , {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(formData),
   })
   .then (response => isOK = response)
   .catch(error => {
     window.alert(error);
     return;
   });
   console.log('update',isOK);
   return isOK
}