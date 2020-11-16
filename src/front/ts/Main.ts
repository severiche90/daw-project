/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main frontend file (where the logic is)
=============================================================================*/

interface DeviceInt {
   
  id:string;
  name:string;
  description:string;
  state:string;
  type:string;
}


class Main implements EventListenerObject, GETResponseListener, POSTResponseListener {
    
  myf:MyFramework;
  view:ViewMainPage;
  counter:number=0;

    //========[Metodo Main]==============
    main():void {  

        //console.log("estoy en Main()");

        let usuarios:Array<User>;
        usuarios = new Array();
        usuarios.push(new User(1, "jose", "jose@gmail.com"));
        usuarios.push(new User(2, "ana", "ana@gmail.com"));
        usuarios.push(new User(3, "pepe", "pepe@gmail.com"));
        
        for (let i in usuarios) {
          usuarios[i].printInfo();
        }

        /*this.mostrarUsers(usuarios); //invoco al metodo que muestra el array de usuarios  
        let b:HTMLElement = document.getElementById("boton");
        b.addEventListener("click",this);  */

        this.myf = new MyFramework(); 
        this.view= new ViewMainPage(this.myf);

        // this.myf.configEventListener("click","boton",this);
        this.myf.configEventListener("click","boton2",this);
        this.myf.configEventListener("click","boton3",this);
        this.myf.configEventListener("click","boton4",this);
        this.myf.requestGET("http://localhost:8000/dispositivos",this);
        //this.myf.requestGET("Devices.txt",this); Solicito los datos del archivo Devices.txt

        //myf.configClick("boton", ()=>(this.evento));  
        //b.textContent = "hola mundo!";  
        //this.evento
    }
    
    //======[Metodo que muestra el Array Users]=====
    mostrarUsers(users:Array<User>):void {

       for(let i in users){ // for each itera sobre los indices
         
         users[i].printInfo();
       } 
       //otra forma de recorrer el Array, itera sobre los objetos iterables, desde la variable objeto "o" 
       for(let o of users){ 
       o.printInfo();
       }
    }
    
    //========[Metodo que maneja los eventos]===============
    handleEvent(evt:Event):void {
      
      console.log(`se hizo "${evt.type}"`);
      //console.log(this);
      let b:HTMLElement= this.myf.getElementByEvent(evt);
      console.log(b);

      //======[Cuando el evento proviene de boton BUTTTON]========
      if(b.id=="boton"){ 
        this.counter++;
        b.textContent = `click ${this.counter}`; // cambia de estado en el boton, click 1, click2..., etc 
      } 
      
      //=====[Cuando el evento proviene del boton "ACEPTAR" del modal EDIT]=====
      else if(b.id=="boton2"){ 

        console.log("hola soy boton 2");
       
        let c1=this.myf.getElementById("identificacion").value;
        let c2=this.myf.getElementById("nombre").value;
        let c3=this.myf.getElementById("descripcion").value;
        let c4=this.myf.getElementById("typo").value;
        
        let data = {"id":c1,"name":c2,"description":c3,"type":c4};
        this.myf.requestPOST("http://localhost:8000/dispositivos/editar",data,this);
      } 
      //======[Cuando el evento proviene del boton "ACEPTAR" del modal DELETE]======
      else if(b.id=="boton3"){

       console.log("soy boton 3");  
       let c1=this.myf.getElementById("ideEliminar").value; 
       let data= {"id":c1}; 
       this.myf.requestPOST("http://localhost:8000/dispositivos/eliminar",data,this);
      }
      //=====[Cuando el evento proviene del boton "ACEPTAR" del modal ADD"]========
      else if(b.id=="boton4"){
                
        console.log("hola soy boton 4");
        
        let c1=this.myf.getElementById("nombreAgregar").value;
        let c2=this.myf.getElementById("descripcionAgregar").value;
        let c3=this.myf.getElementById("stateAgregar").value;
        let c4=this.myf.getElementById("typeAgregar").value;
        
        let data = {"name":c1,"description":c2,"state":c3,"type":c4};
        this.myf.requestPOST("http://localhost:8000/dispositivos/agregar",data,this);
      }
      //======[Cuando el evento proviene del Switch]===============
      else{ 
        
        let state:boolean = this.view.getSwitchStateById (b.id); // obtiene el estado de switch
        let data = { "id":`${b.id}`, "state":state };
        this.myf.requestPOST ("https://cors-anywhere.herokuapp.com/https://postman-echo.com/post", data, this);
      }
    }

    handleGETResponse(status:number, response:string):void {
      
      console.log("Respuesta del servidor: "+response);
      let data: DeviceInt[] = JSON.parse(response);
      //console.log(data);
      this.view.showDevices(data);

      for(let d of data){

         let b:HTMLElement=this.myf.getElementById(`dev_${d.id}`);
         b.addEventListener("click",this);
      }  
    }

    handlePOSTResponse(status:number, response:string): void {
      
      console.log(status);
      console.log(response);
    }
}

window.onload = () => {  //funcion anonima  fat arrow  
    let m = new Main();
    m.main();
}; 
//=======[ Settings, Imports & Data ]==========================================
let user = "TypesScript Users!";
//=======[ Main module code ]==================================================
function greeter(person) {
    return "Hello, " + person;
}
//document.body.innerHTML = greeter(user);
//console.log("Hola mundo!");
//=======[ End of file ]=======================================================
