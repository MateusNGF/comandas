
import AppExpress from './config/appExpress'

(async ()=>{
  try{
    const app = await AppExpress.init()

    app.listen(process.env.PORT, () => {
      console.log(process.env.PORT);
      
      console.log("Rodouuu")
    })
  }catch(erro){
    console.error("Error", erro)
  }
})()