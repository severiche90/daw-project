class User{
    
    private _id:number;
    private _name:string;
    private _email:string;;
    private _isLogged:boolean;
   
    constructor(_id:number, _name:string, _email:string){
           this._id=_id;
           this._name=_name; 
           this._email=_email;
    }
    
    set id(id:number){
      this._id=id;
    }
 
    get id():number{
      return this._id;
    }
 
    set name(name:string){
       this._name=name;
    }
   
    get name():string{
       return this._name;
    }
 
    set email(email:string){
        this._email=email; 
    }
    
    get email():string{
        return this._email;
    }
 
    set isLogged(isLogged:boolean){
        this._isLogged=isLogged;
    }
 
    get isLogged():boolean{
       return this._isLogged;
    }
 
    printInfo():void{
 
      console.log("id="+this._id +" "+"name="+this._name+" "+"email="+this._email);
    }
 }