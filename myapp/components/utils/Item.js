// Do cấu trúc hiển thị này có thể tái sử dụng nên tách làm 1 components -> Để hiện thị lesson , course ... 
import { Image } from "react-native";
import { List } from "react-native-paper";
import MyStyles from "../../Styles/MyStyles";
import moment from 'moment';

const Item = ({instance}) => {
    return <List.Item  title={instance.subject || instance.content} 
                description={instance.created_date?moment(instance.created_date).fromNow():""} 
                left={() => <Image style={MyStyles.avatar} source={{uri: instance.image}} />}  />
}

export default Item;
