// import React, {useRef} from 'react';
// import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
// import RBSheet from 'react-native-raw-bottom-sheet';

// const CustomBottomSheet = ({children, moduleTitle}) => {
//   const refRBSheet = useRef();

//   const openBottomSheet = () => {
//     refRBSheet.current.open();
//   };
//   const closeBottomSheet = () => {
//     refRBSheet.current.close();
//   };

//   return (
//     <View style={{alignSelf: 'center'}}>
//       <TouchableOpacity
//         style={{
//           borderWidth: StyleSheet.hairlineWidth,
//           paddingHorizontal: 10,
//           margin: 10,
//           borderRadius: 36,
//           padding: 6,
//         }}
//         onPress={openBottomSheet}>
//         <Text>{`${moduleTitle}`}</Text>
//       </TouchableOpacity>
//       <RBSheet
//         ref={refRBSheet}
//         closeOnDragDown={true}
//         closeOnPressMask={true}
//         height={183}
//         customStyles={{
//           container: {
//             borderTopRightRadius: 16,
//             borderTopLeftRadius: 16,
//             // justifyContent: 'center',
//             // alignItems: 'center',
//           },
//           wrapper: {
//             // backgroundColor: 'transparent',
//           },
//           // draggableIcon: {
//           //   backgroundColor: '#000',
//           // },
//         }}>
//         {/* {children} */}
//         {React.cloneElement(children, {closeBottomSheet})}
//       </RBSheet>
//     </View>
//   );
// };

// export default CustomBottomSheet;

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import EventTypeChip from './chipComponent/EventTypeChip';
import SeverityLevelChip from './chipComponent/SeverityLevelChip';
import RadiusChip from './chipComponent/RadiusChip';
import PlusButtonComp from './PlusButtonComp/PlusButtonComp';

const CustomBottomSheet = ({selectedItem, onClose}) => {
  console.log(selectedItem);
  const renderChipComponent = () => {
    switch (selectedItem) {
      case 'Event Type':
        return <EventTypeChip onClose={onClose} />;
      case 'Severity Level':
        return (
          <SeverityLevelChip
            onClose={onClose}
            showButtons={true}
            showTitle={true}
          />
        );
      case 'Radius':
        return <RadiusChip onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <View style={{}}>
      {/* <Text>{`Selected Item: ${selectedItem}`}</Text> */}

      {/* Render your existing components here */}
      {renderChipComponent()}

      {/* <TouchableOpacity onPress={onClose}>
        <Text style={{color: 'blue', marginTop: 10}}>Close Bottom Sheet</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default CustomBottomSheet;
