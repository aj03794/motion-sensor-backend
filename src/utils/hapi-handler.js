// This is the parital application function that ultimately is responsible
// for returning values to the client;


// Don't really need a partial application function anymore because I am not passing
// req, h to the returned function anymore
export const partialApplicationFunction = data => {
  // this req and h corresponds to the parameters that hapi has in its routes
  return () => {
      console.log('partialApplicationFunction')
      // console.log('data', data);
      return data
    }
  }
