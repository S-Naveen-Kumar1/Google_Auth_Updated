import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, ActivityIndicator, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { ProductsCard } from './ProductsCard';

export const Products = () => {
    const [text, onChangeText] = useState('');
    const [category, setCategory] = useState(); 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://dummy-server-ipe7.onrender.com/products`, {
                    params: {
                        category,
                        search: text
                    },
                });
                console.log(res.data);
                setProducts(res.data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Error fetching products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category, text]);


    useEffect(() => {
        console.log('Category:', category);
    }, [category]);

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Search Products"
                />
            </View>
            <Picker
                selectedValue={category}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
            >
                <Picker.Item label="Electronics" value="electronics" />
                <Picker.Item label="Clothes" value="clothes" />
            </Picker>
            {loading ? (
                <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
            ) : error ? (
                <Text style={styles.error}>{error}</Text>
            ) : (
                <ScrollView contentContainerStyle={styles.productsContainer}>
                    {products?.length > 0 ? (
                        products.map((item) => <ProductsCard key={item.id} {...item} />)
                    ) : (
                        <Text>No products found.</Text>
                    )}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '75%',
    },
    input: {
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        width: '80%',
        marginTop: 20,
    },
    picker: {
        width: '80%',
    },
    productsContainer: {
        alignItems: 'center',
    },
    loader: {
        marginTop: 20,
    },
    error: {
        marginTop: 20,
        color: 'red',
    },
});


