// import React from "react";
// import { Text, View, ActivityIndicator, Image, StatusBar, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
// import { Chip, List, Searchbar } from "react-native-paper";

// import MyStyles from "../../Styles/MyStyles";
// import APIs, { endpoints } from "../../configs/APIs";

moment.locale("vi");
import moment from "moment";
import "moment/locale/vi";



import { View, Text, ActivityIndicator, Image, ScrollView, TouchableOpacity ,  RefreshControl } from "react-native";
import MyStyles from "../../Styles/MyStyles";
import React from 'react';
import APIs , {endpoints} from "../../configs/APIs";
import { Chip, List, Searchbar } from "react-native-paper";
import Item from "../utils/Item";
import { isCloseToBottom } from "../utils/Utils";

const Course = ({navigation}) => {
    const [categories, setCategories] = React.useState(null);
    const [courses, setCourses] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [q, setQ] = React.useState("");
    const [cateId, setCateId] = React.useState("");
    const [page, setPage] = React.useState(1);

    const loadCates = async () => {
        try {
           
            let res = await APIs.get(endpoints['categories']);
            setCategories(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }
    
    const loadCourses = async () => {

        if (page > 0) {
            setLoading(true);
            try {
                let url = `${endpoints['courses']}?q=${q}&category_id=${cateId}&page=${page}`;
                
                let res = await APIs.get(url);
    
                if (res.data.next === null)
                    setPage(0);
    
                if (page === 1)
                    setCourses(res.data.results);
                else
                    setCourses(current => {
                        return [...current, ...res.data.results];
                    });
            } catch (ex) {
                console.error(ex);
            } finally {
                setLoading(false);
            }
            
        }
    }

    React.useEffect(() => {
        loadCates();
    }, []);

    React.useEffect(() => {
        loadCourses();
    }, [q, cateId, page]);

    // const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    //     const paddingToBottom = 20;
    //     return layoutMeasurement.height + contentOffset.y >=
    //       contentSize.height - paddingToBottom;
    // };

    const loadMore = ({nativeEvent}) => {
        if (!loading && page > 0 && isCloseToBottom(nativeEvent)) {
                setPage(page + 1);
        }
    }
    const goLesson = (courseId) => {
      // Lesson là tên bên của App.js

      navigation.navigate('Lesson', { courseId: courseId });
      //Debug
      // console.log("Navigating to Lesson with courseId:", courseId); // Kiểm tra giá trị
      // if (!courseId) {
      //     console.error("Invalid courseId, cannot navigate");
      //     return;
      // }

  }
    const search = (value, callback) => {
        setPage(1);
        callback(value);
    }
    return (
        <View style={[MyStyles.container, MyStyles.margin]}>
            <View style={[MyStyles.row, MyStyles.wrap]}>
                <Chip mode={!cateId?"outlined":"flat"} onPress={() => search("", setCateId)} style={MyStyles.margin} icon="shape-plus">Tất cả</Chip>
                {categories===null?<ActivityIndicator/>:<>
                    {categories.map(c => <Chip mode={c.id===cateId?"outlined":"flat"} key={c.id} onPress={() => search(c.id, setCateId)} style={MyStyles.margin} icon="shape-plus">{c.name}</Chip>)}
                </>}
            </View>
            <View>
                <Searchbar placeholder="Tìm kiếm khóa học" onChangeText={(t) => search(t, setQ)} value={q} />
            </View>
            <ScrollView onScroll={loadMore}>
            <RefreshControl onRefresh={() => loadCourses()} />
                {loading && <ActivityIndicator/>}
                {/* Tên Lesson đúng với tên của file js */}
                {courses.map(c =>  <TouchableOpacity key={c.id} onPress={() =>   goLesson(c.id) }>
                    <Item instance={c} />
                </TouchableOpacity>)}
                {loading && page > 1 && <ActivityIndicator />}
            </ScrollView>
        </View>
    );

  
};

export default Course;
// const Course = ({navigation}) => {
//   const [categories, setCategories] = React.useState(null);
//   const [courses, setCourses] = React.useState([]);
//   const [loading, setLoading] = React.useState(false);
//   const [q, setQ] = React.useState("");
//   const [cateId, setCateId] = React.useState("");
//   const [page, setPage] = React.useState(1);

//   const loadCates = async () => {
//     try {
//       let res = await APIs.get(endpoints["categories"]);
//       setCategories(res.data);
//     } catch (ex) {
//       console.error(ex);
//     }
//   };
//   const goLesson = (courseId) => {
//     // Truyền tham số để bên kia lấy
//     navigation.navigate('Lesson', {'courseId':courseId})

//   }

//   const loadCourses = async () => {
//     try {
//       setLoading(true);
//       // Của mình đặt là 
//       let url = `${endpoints['courses']}?q=${q}&category_id=${cateId}`;
//       if (page > 0) url = `${url}&page=${page}`;
//       console.log(url); // In URL ra để kiểm tra

//       let res = await APIs.get(url);
//       const newCourses = res.data.results;

//       if (page === 1) {
//         setCourses(newCourses); // reset danh sách khi ở trang 1
//       } else {
//         setCourses(current => {
//           const currentIds = current.map(course => course.id);
//           const filteredNewCourses = newCourses.filter(course => !currentIds.includes(course.id));
//           return [...current, ...filteredNewCourses];
//         });
//       }

//       if (res.data.next === null) {
//         setPage(0); // nếu không còn trang tiếp theo
//       }
//     } catch (ex) {
//       console.error(ex);
//     } finally {
//       setLoading(false);
//     }
//   };

//   React.useEffect(() => {
//     loadCates();
//   }, []);

//   React.useEffect(() => {
//     loadCourses();
//   }, [q, cateId, page]);

//   React.useEffect(() => {
//     setCourses([]); // Reset courses khi cateId thay đổi
//     setPage(1); // Reset page khi cateId thay đổi
//   }, [cateId]);
// // Thiếu cái search -> tránh bị duplicate dữ lieu
//   const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
//     const paddingToBottom = 20;
//     return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
//   };

//   const loadMore = (nativeEvent) => {
//     if (!loading && page > 0 && isCloseToBottom(nativeEvent)) {
//       setPage(prevPage => prevPage + 1); // Tăng page
//     }
//   };

//   return (
//     <>
//       <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />
//       <View style={[MyStyles.container, MyStyles.margin]}>
//         <View style={MyStyles.row}>
//           <Chip
//             mode={!cateId ? "outlined" : "flat"}
//             style={MyStyles.margin}
//             onPress={() => setCateId("")}
//             icon="shape-outline"
//           >
//             Tất cả
//           </Chip>
//           {categories === null ? (
//             <ActivityIndicator />
//           ) : categories.length === 0 ? (
//             <Text>Chưa có danh mục</Text>
//           ) : (
//             categories.map((c, index) => (
//               <Chip
//                 key={`${c.id}-${index}`}
//                 style={MyStyles.margin}
//                 icon="shape-outline"
//                 onPress={() => setCateId(c.id)}
//               >
//                 {c.name}
//               </Chip>
//             ))
//           )}
//         </View>
//         <Searchbar
//           placeholder="Tìm khóa học..."
//           value={q}
//           onChangeText={(text) => setQ(text)}
//         />
//         <ScrollView
//           onScroll={({ nativeEvent }) => loadMore(nativeEvent)}
//           refreshControl={<RefreshControl refreshing={loading} onRefresh={loadCourses} />}
//           scrollEventThrottle={16}
//         >
//           {/* TouchadbleOpacity -> để click vào */}
//           {courses.map((c, index) => ( <TouchableOpacity key={`${c.id}-${index}`} onPress= {goLesson(c.id)}>
//             <List.Item
//               style={MyStyles.margin}
              
//               title={<Text>{c.subject || "Chưa có tiêu đề"}</Text>}
//               description={<Text>{moment(c.created_date).format("DD/MM/YYYY") || "Không xác định"}</Text>}
//               left={() => <Image style={MyStyles.avatar} source={{ uri: c.image }} />}
//             />
//           </TouchableOpacity>

//           ))}
//           {loading && page > 1 && <ActivityIndicator />}
//         </ScrollView>
//       </View>
//     </>
//   );
// };

// export default Course;
