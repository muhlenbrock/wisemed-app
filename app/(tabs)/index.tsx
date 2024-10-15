import React, { useEffect } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppDispatch, useAppSelector } from '@/hooks/hooksRedux';
import { userListData, userListLoading, fetchUsers } from '@/features/users/usersSlice';
import { Banner } from '@/components/Banner/Banner';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';

const Images = [
  require('../../assets/images/neurologia-icon.png'),
  require('../../assets/images/genetica-icon.png'),
  require('../../assets/images/odontologia-icon.png')
];
export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const userList = useAppSelector(userListData);
  const userListLoadingState = useAppSelector(userListLoading);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <Banner />
      </ThemedView>
      <Link href="/specialists" asChild>
        <TouchableOpacity style={styles.specialtyTouchable}>
          <View style={styles.specialtyCard}>
            <Text style={styles.specialtyTitle}>¿Tiene alguna dolencia?</Text>
            <Text style={styles.specialtySubtitle}>Encuentre aquí especialistas adecuados</Text>
          </View>
          <Feather name="arrow-right" size={24} color="black" style={styles.specialtyArrow} />
        </TouchableOpacity>
      </Link>
      <ThemedText style={styles.specialtyTitleDivider}>Especialidades 😷</ThemedText>
      <View style={styles.specialtyContainer}>
        {['Neurología', 'Genética', 'Odontología'].map((specialty, index) => {
          return (
            <View key={index} style={styles.specialtyItem}>
              <View style={styles.specialtyIconContainer}>
                <Image source={Images[index]} style={styles.specialtyIcon} />
              </View>
              <ThemedText style={styles.specialtyName}>{specialty}</ThemedText>
              <ThemedText
                style={styles.specialtyDoctors}
              >{`${index === 0 ? 2029 : index === 1 ? 1870 : 1064} Especialistas`}</ThemedText>
            </View>
          );
        })}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 16
  },
  title: {
    paddingTop: 15,
    textAlign: 'left',
    width: '100%',
    fontSize: 14,
    paddingBottom: 20
  },
  specialtyTouchable: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    backgroundColor: '#efefef'
  },
  specialtyCard: {
    flexDirection: 'column',
    flex: 1
  },
  specialtyTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  specialtySubtitle: {
    color: 'gray'
  },
  specialtyArrow: {
    borderRadius: 50,
    padding: 8
  },
  specialtyTitleDivider: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16
  },
  specialtyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16
  },
  specialtyItem: {
    alignItems: 'center'
  },
  specialtyIconContainer: {
    backgroundColor: '#f6f6f9',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8
  },
  specialtyIcon: {
    width: 40,
    height: 40
  },
  specialtyName: {
    fontWeight: 'bold',
    marginBottom: 4
  },
  specialtyDoctors: {
    color: 'gray',
    fontSize: 12
  }
});
