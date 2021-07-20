import { Bytes, json, JSONValue, JSONValueKind, TypedMap } from '@graphprotocol/graph-ts'
import { jsonToString } from './helpers';
let addresses:string[] 
let a:String[] 

let b:string;
 b = "[{\"id\":\"1\",\"owner\":\"0x2d891ed45c4c3eab978513df4b92a35cf131d2e2\",\"address\":\"0xa58b5224e2fd94020cb2837231b2b0e4247301a6\"},{\"id\":\"42\",\"owner\":\"0x623fc4f577926c0aadaef11a243754c546c1f98c\",\"address\":\"0xbC8559D24EC625D2e5b91dCE91F44384A2F5bE4A\"},{\"id\":\"15\",\"owner\":\"0x78495152a188c643188c9da24ebef5bc6b0bf6c2\",\"address\":\"0xF78229f4F3EF95FecbEA50239A26339B5aD2d31c\"},{\"id\":\"85\",\"owner\":\"0x8096da6ced12b75684054ef16e1bf7e376353c29\",\"address\":\"0xdcc51076a4d5fdd7e69c6cce809bcd413ed2adb2\"},{\"id\":\"93\",\"owner\":\"0x8aa4e4ce16bd89239c03cf7687757ba95a64d3a9\",\"address\":\"0xAeFFdf4a5baECd175f3F73d529fFeD26f5e83ec7\"},{\"id\":\"94\",\"owner\":\"0x8aa4e4ce16bd89239c03cf7687757ba95a64d3a9\",\"address\":\"0xbe3E6eD1D5e5FaA58D98693eA6e2CF4f2c80b426\"},{\"id\":\"98\",\"owner\":\"0xe726d0598cfbb879459451b9df5a481add1f36c2\",\"address\":\"0xb82671D8a6bb3B3077c940D0344df0b99e64aC22\"},{\"id\":\"105\",\"owner\":\"0x9eaf1b95ee669f55d542495f92b331e207b08cd9\",\"address\":\"0xe785afD390bccC9110923B81d8AB04edAFACb971\"},{\"id\":\"103\",\"owner\":\"0xe773382a7574de1c82b1f67099e680c043048708\",\"address\":\"0x673f01361566B6f2B402CDaA4951719A27C738C3\"},{\"id\":\"108\",\"owner\":\"0xfccb96245ECE8C0c0ba80992A5719cbA1E2f504f\",\"address\":\"0x25dcA74800852cd9E384970A9e6a29151Ff0eD8F\"},{\"id\":\"118\",\"owner\":\"0xbAE49fe607bdDb4cB4C946C47CCFcc71c83e4893\",\"address\":\"0x534CC87f046a52a99F21958114A7872c02fBF9BD\"},{\"id\":\"117\",\"owner\":\"0x73275915dc3df6d24812f6e8815d83ffecf69643\",\"address\":\"0xD88e73ad2BFa1CEc029DEed18eC5E44d2dcEca1e\"},{\"id\":\"123\",\"owner\":\"0xb432005e1010492fa315b9737881e5e18925204c\",\"address\":\"0xEf9A88Fd0232c477018F2131168F67E2bbe97d92\"},{\"id\":\"121\",\"owner\":\"0xad99a67ac78b80e00c0b07bb3f526cd26b843611\",\"address\":\"0x52F3Adf1E91DD96EA2A4BCcc4e6F56757300ccd5\"},{\"id\":\"120\",\"owner\":\"0xce27d8bcee45db3e457ecf8629264ca7893aaaac\",\"address\":\"0xF588337ac1E58F363Df651CF3E365876CD74831b\"},{\"id\":\"147\",\"owner\":\"0x7c41f39b8d12409486d9ed36134aed9b2345cb6c\",\"address\":\"0x7fCfd34a7ff035fa19505646DAAEd4a3Cb88891D\"},{\"id\":\"138\",\"owner\":\"0x7c4a24c5b1c0eba323ac796b841708ca4f79feb1\",\"address\":\"0x7Fb64B2F778A5b5f275ddfF3A7D638C496D79769\"},{\"id\":\"141\",\"owner\":\"0x7a44d904e5372f64db51436fcdf4024a8144c383\",\"address\":\"0xe3E58fa3994AD30A66FA2Def7a553673EB40c499\"},{\"id\":\"148\",\"owner\":\"0x081e92f8b195999d71b8c88d042da75f8be8ed9f\",\"address\":\"0xE548145D4e134cFFC2e2bC3C75c7BaD3b04538ce\"},{\"id\":\"146\",\"owner\":\"0x3982de9d0b6fb0e12c89e0512c8fd903f0d9370b\",\"address\":\"0xCd1aC8220c5493E30c6d1888690a1aFB63a0Ffda\"},{\"id\":\"167\",\"owner\":\"0xb7d3a787a39f25457ca511dc3f0591b546f5e02f\",\"address\":\"0x6E4E6091Ed4d13AD4F504d53239291269d474f6d\"}]"

 let bb:Bytes = Bytes.fromUTF8(b) as Bytes
 let jsonList = json.fromBytes(bb)
    let arrayOfBytes = jsonList.toArray()

export let arrayOfBytess = arrayOfBytes

a= ["0xa58b5224e2fd94020cb2837231b2b0e4247301a6","0xbC8559D24EC625D2e5b91dCE91F44384A2F5bE4A","0xF78229f4F3EF95FecbEA50239A26339B5aD2d31c","0xdcc51076a4d5fdd7e69c6cce809bcd413ed2adb2","0xAeFFdf4a5baECd175f3F73d529fFeD26f5e83ec7","0xbe3E6eD1D5e5FaA58D98693eA6e2CF4f2c80b426","0xb82671D8a6bb3B3077c940D0344df0b99e64aC22","0xe785afD390bccC9110923B81d8AB04edAFACb971","0x673f01361566B6f2B402CDaA4951719A27C738C3","0x25dcA74800852cd9E384970A9e6a29151Ff0eD8F","0x534CC87f046a52a99F21958114A7872c02fBF9BD","0xD88e73ad2BFa1CEc029DEed18eC5E44d2dcEca1e","0xEf9A88Fd0232c477018F2131168F67E2bbe97d92","0x52F3Adf1E91DD96EA2A4BCcc4e6F56757300ccd5","0xF588337ac1E58F363Df651CF3E365876CD74831b","0x7fCfd34a7ff035fa19505646DAAEd4a3Cb88891D","0x7Fb64B2F778A5b5f275ddfF3A7D638C496D79769","0xe3E58fa3994AD30A66FA2Def7a553673EB40c499","0xE548145D4e134cFFC2e2bC3C75c7BaD3b04538ce","0xCd1aC8220c5493E30c6d1888690a1aFB63a0Ffda","0x6E4E6091Ed4d13AD4F504d53239291269d474f6d"]

a.forEach((value,index,a)=>{
    let newAddress:string=''
    for(let i = 0; i < value.length; i++){
        let letter:string = value[i]
        let ascii = value.charCodeAt(i);
        if(ascii >= 65 && ascii <= 90){
            newAddress+= String.fromCharCode(ascii + 32)
        }else{
            newAddress+=letter
        }
    }
    addresses.push(newAddress)
})
export let LEGACY_ADDRESSES = addresses