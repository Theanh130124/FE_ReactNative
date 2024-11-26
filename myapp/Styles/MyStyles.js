import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flex: 1, 
        marginTop : 50 ,
        justifyContent:'center',
        // alignItems : 'center'
    } , subject :{
        fontSize : 30 ,
        fontWeight : "bold",
        color:"blue"  ,
    },row: 
    {
        //Mặc đinh là colums
        flexDirection : "row", 
        //Xuống dòng
        flexWrap : "wrap",
    
    }, margin:{
        margin : 10 ,
    

    },
    avatar: {
        width: 80 ,
        height : 80,
        borderRadius : 15

    },
    txt_primary:
    {
        fontSize : 30 ,
        fontWeight : 10 ,
        color : 'red' ,


    }
    
}
)