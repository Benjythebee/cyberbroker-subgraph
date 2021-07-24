import { Bytes, json, JSONValue, JSONValueKind, TypedMap } from '@graphprotocol/graph-ts'
import { jsonToString } from './helpers';
let addresses:string[] 
let a:String[] 

let b:string;
 b = "[{\"id\":\"1\",\"owner\":\"0x2d891ed45c4c3eab978513df4b92a35cf131d2e2\",\"address\":\"0xa58b5224e2fd94020cb2837231b2b0e4247301a6\"},{\"id\":\"42\",\"owner\":\"0x623fc4f577926c0aadaef11a243754c546c1f98c\",\"address\":\"0xbc8559d24ec625d2e5b91dce91f44384a2f5be4a\"},{\"id\":\"15\",\"owner\":\"0x78495152a188c643188c9da24ebef5bc6b0bf6c2\",\"address\":\"0xf78229f4f3ef95fecbea50239a26339b5ad2d31c\"},{\"id\":\"85\",\"owner\":\"0x8096da6ced12b75684054ef16e1bf7e376353c29\",\"address\":\"0xdcc51076a4d5fdd7e69c6cce809bcd413ed2adb2\"},{\"id\":\"93\",\"owner\":\"0x8aa4e4ce16bd89239c03cf7687757ba95a64d3a9\",\"address\":\"0xaeffdf4a5baecd175f3f73d529ffed26f5e83ec7\"},{\"id\":\"94\",\"owner\":\"0x8aa4e4ce16bd89239c03cf7687757ba95a64d3a9\",\"address\":\"0xbe3e6ed1d5e5faa58d98693ea6e2cf4f2c80b426\"},{\"id\":\"98\",\"owner\":\"0xe726d0598cfbb879459451b9df5a481add1f36c2\",\"address\":\"0xb82671d8a6bb3b3077c940d0344df0b99e64ac22\"},{\"id\":\"105\",\"owner\":\"0x9eaf1b95ee669f55d542495f92b331e207b08cd9\",\"address\":\"0xe785afd390bccc9110923b81d8ab04edafacb971\"},{\"id\":\"103\",\"owner\":\"0xe773382a7574de1c82b1f67099e680c043048708\",\"address\":\"0x673f01361566b6f2b402cdaa4951719a27c738c3\"},{\"id\":\"108\",\"owner\":\"0xfccb96245ece8c0c0ba80992a5719cba1e2f504f\",\"address\":\"0x25dca74800852cd9e384970a9e6a29151ff0ed8f\"},{\"id\":\"118\",\"owner\":\"0xbae49fe607bddb4cb4c946c47ccfcc71c83e4893\",\"address\":\"0x534cc87f046a52a99f21958114a7872c02fbf9bd\"},{\"id\":\"117\",\"owner\":\"0x73275915dc3df6d24812f6e8815d83ffecf69643\",\"address\":\"0xd88e73ad2bfa1cec029deed18ec5e44d2dceca1e\"},{\"id\":\"123\",\"owner\":\"0xb432005e1010492fa315b9737881e5e18925204c\",\"address\":\"0xef9a88fd0232c477018f2131168f67e2bbe97d92\"},{\"id\":\"121\",\"owner\":\"0xad99a67ac78b80e00c0b07bb3f526cd26b843611\",\"address\":\"0x52f3adf1e91dd96ea2a4bccc4e6f56757300ccd5\"},{\"id\":\"120\",\"owner\":\"0xce27d8bcee45db3e457ecf8629264ca7893aaaac\",\"address\":\"0xf588337ac1e58f363df651cf3e365876cd74831b\"},{\"id\":\"147\",\"owner\":\"0x7c41f39b8d12409486d9ed36134aed9b2345cb6c\",\"address\":\"0x7fcfd34a7ff035fa19505646daaed4a3cb88891d\"},{\"id\":\"138\",\"owner\":\"0x7c4a24c5b1c0eba323ac796b841708ca4f79feb1\",\"address\":\"0x7fb64b2f778a5b5f275ddff3a7d638c496d79769\"},{\"id\":\"141\",\"owner\":\"0x7a44d904e5372f64db51436fcdf4024a8144c383\",\"address\":\"0xe3e58fa3994ad30a66fa2def7a553673eb40c499\"},{\"id\":\"148\",\"owner\":\"0x081e92f8b195999d71b8c88d042da75f8be8ed9f\",\"address\":\"0xe548145d4e134cffc2e2bc3c75c7bad3b04538ce\"},{\"id\":\"146\",\"owner\":\"0x3982de9d0b6fb0e12c89e0512c8fd903f0d9370b\",\"address\":\"0xcd1ac8220c5493e30c6d1888690a1afb63a0ffda\"},{\"id\":\"167\",\"owner\":\"0xb7d3a787a39f25457ca511dc3f0591b546f5e02f\",\"address\":\"0x6e4e6091ed4d13ad4f504d53239291269d474f6d\"},{\"id\":\"179\",\"owner\":\"0x9f79e17a35bf290925191245e1a1b4510d457497\",\"address\":\"0xb2fa4b108bcb7ef72c4457af780621a5d4b4ee94\"},{\"id\":\"206\",\"owner\":\"0x62f099a34f01d57c67a100851184bea0d48b45f6\",\"address\":\"0xfc30c1e006de173984155adbc4e62c55ee7acff9\"},{\"id\":\"192\",\"owner\":\"0x4ebdd05348ff7299cb116e3dd61601154c784660\",\"address\":\"0xf655765519865cb47ff3069276370594f6bc93a3\"},{\"id\":\"200\",\"owner\":\"0xf4a12bc4596e1c3e19d512f76325b52d72d375cf\",\"address\":\"0x95b1ef71eb42d3129f9ceaa7fe62cb1e24384307\"}]"

 let bb:Bytes = Bytes.fromUTF8(b) as Bytes
 let jsonList = json.fromBytes(bb)
    let arrayOfBytes = jsonList.toArray()

export let arrayOfBytess = arrayOfBytes

a= ["0xa58b5224e2fd94020cb2837231b2b0e4247301a6","0xbc8559d24ec625d2e5b91dce91f44384a2f5be4a","0xf78229f4f3ef95fecbea50239a26339b5ad2d31c","0xdcc51076a4d5fdd7e69c6cce809bcd413ed2adb2","0xaeffdf4a5baecd175f3f73d529ffed26f5e83ec7","0xbe3e6ed1d5e5faa58d98693ea6e2cf4f2c80b426","0xb82671d8a6bb3b3077c940d0344df0b99e64ac22","0xe785afd390bccc9110923b81d8ab04edafacb971","0x673f01361566b6f2b402cdaa4951719a27c738c3","0x25dca74800852cd9e384970a9e6a29151ff0ed8f","0x534cc87f046a52a99f21958114a7872c02fbf9bd","0xd88e73ad2bfa1cec029deed18ec5e44d2dceca1e","0xef9a88fd0232c477018f2131168f67e2bbe97d92","0x52f3adf1e91dd96ea2a4bccc4e6f56757300ccd5","0xf588337ac1e58f363df651cf3e365876cd74831b","0x7fcfd34a7ff035fa19505646daaed4a3cb88891d","0x7fb64b2f778a5b5f275ddff3a7d638c496d79769","0xe3e58fa3994ad30a66fa2def7a553673eb40c499","0xe548145d4e134cffc2e2bc3c75c7bad3b04538ce","0xcd1ac8220c5493e30c6d1888690a1afb63a0ffda","0x6e4e6091ed4d13ad4f504d53239291269d474f6d","0xb2fa4b108bcb7ef72c4457af780621a5d4b4ee94","0xfc30c1e006de173984155adbc4e62c55ee7acff9","0xf655765519865cb47ff3069276370594f6bc93a3","0x95b1ef71eb42d3129f9ceaa7fe62cb1e24384307"]

// a.forEach((value,index,a)=>{
//     let newAddress:string=''
//     for(let i = 0; i < value.length; i++){
//         let letter:string = value[i]
//         let ascii = value.charCodeAt(i);
//         if(ascii >= 65 && ascii <= 90){
//             newAddress+= String.fromCharCode(ascii + 32)
//         }else{
//             newAddress+=letter
//         }
//     }
//     addresses.push(newAddress)
// })
export let LEGACY_ADDRESSES = a