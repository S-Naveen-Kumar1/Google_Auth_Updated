import { Text, View, StyleSheet } from "react-native";

export const ProductsCard = ({ brand, category, price }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.text}>Brand: {brand}</Text>
            <Text style={styles.text}>Category: {category}</Text>
            <Text style={styles.text}>Price: {price}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',

        borderRadius: 8,
        padding: 17,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        
     width:300,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin:"auto"
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 8,
    },
    
});

export default ProductsCard;
