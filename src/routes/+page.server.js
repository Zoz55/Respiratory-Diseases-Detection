// import * as tf from '@tensorflow/tfjs-node';
// import Jimp from 'jimp';

export const actions = {
    // upload: async ({ cookies, request }) => {
    //     const {file} = Object.fromEntries(await request.formData());
    //   console.log("File:",file);
    //     const dic = {0 : 'Covid', 1 : 'Healthy', 2 : 'Lung Tumor', 3 : 'Common Pneumonia'};
    
    //     // Load model
    //     const myModel = await tf.loadLayersModel('https://raw.githubusercontent.com/Zoz55/chest-app/old/chest_model_deploy.h5');
        
    //     const SIZE = 64;
    //     const imgPath = 'static/' + file.name;
        
    //     // Read and process the image
    //     const img = await Jimp.read(imgPath);
    //     img.resize(SIZE, SIZE);
    //     let imgArray = await img.getBufferAsync(Jimp.MIME_JPEG);
    //     imgArray = new Uint8Array(imgArray);
    //     let tensor = tf.node.decodeImage(imgArray, 3);
    //     tensor = tensor.div(tf.scalar(255)); // Scale pixel values
    //     tensor = tensor.expandDims(0); // Get it ready as input to the network
        
    //     // Predict
    //     const pred = myModel.predict(tensor);
    //     const predClass = dic[pred.argMax(-1).dataSync()[0]];
        
    //     console.log("Diagnosis is:", predClass);
    //     return { message: {message: predClass,image: '/'+file.name } } ;
    // },
    upload: async ({ cookies, request }) => {
    const {file} = Object.fromEntries(await request.formData());
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("https://ai-flask.azurewebsites.net/static", {
      mode: "no-cors",
      method: "POST",
      body: formData,
    })
      .then((r) => {
        console.log("Inside:",r);
        return r.json();
      })
      .then((data) => {
        console.log("Inside:",data);
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
      console.log("Outside:",response);
    return { message: response };
  },
};
