import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { DateData } from 'react-native-calendars/src/types';
import { Subheading, Text, Title, useTheme } from 'react-native-paper';
import Loading from '../../components/Loading';

import { HistoryNavProps } from './HistoryParamList';
import { formatStringDate } from '../../utils/dateFormat';
import useGetHistoryWorkouts from '../../hooks/useGetHistoryWorkouts';
import { Fontisto, AntDesign, Feather } from '@expo/vector-icons';

type MarkedDateType = {
  [x: string]: {
    selected: boolean;
    marked: boolean;
    selectedColor: string;
  };
};

const CalendarHistory: React.FC<HistoryNavProps<'CalendarHistory'>> = ({
  navigation
}) => {
  const [selectedDate, setSelectedDate] = useState<DateData | null>(null);
  const [markedWorkoutDates, setMarkedWorkoutDates] = useState<
    MarkedDateType | undefined
  >(undefined);
  const { colors } = useTheme();
  const { history, loading } = useGetHistoryWorkouts();

  useEffect(() => {
    let dateObjects;
    if (history) {
      dateObjects = history.reduce((accelerator, current) => {
        (accelerator as MarkedDateType)[
          new Date(current.createdAt).toISOString().split('T')[0]
        ] = {
          selected: false,
          marked: true,
          selectedColor: 'blue'
        };

        return accelerator;
      }, {});
    }

    setMarkedWorkoutDates(dateObjects);
  }, [history]);

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}>
      <Calendar
        style={{
          borderRadius: 20,
          margin: 20,
          padding: 10
        }}
        theme={{
          calendarBackground: '#EAEAEA'
        }}
        onDayPress={(day) => {
          setSelectedDate(day);
        }}
        markedDates={markedWorkoutDates}
        enableSwipeMonths={true}
      />
      <View style={styles.contentContainer}>
        {history && selectedDate
          ? history?.map((workout) => {
              if (
                new Date(workout.createdAt).toLocaleDateString('en-us') ===
                new Date(selectedDate?.dateString).toLocaleDateString('en-us')
              ) {
                return (
                  <View key={workout.id} style={styles.workoutContainer}>
                    <View style={styles.cardTop}>
                      <View>
                        <Title style={styles.fixedTextColor}>
                          {workout.splitName}
                        </Title>
                      </View>
                      <View
                        style={{
                          alignSelf: 'center'
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('HistoryWorkout', {
                              workout
                            })
                          }>
                          <Text style={styles.fixedTextColor}>View</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.cardBottom}>
                      <View style={styles.cardRow}>
                        <AntDesign
                          name='sync'
                          size={24}
                          color='black'
                          style={styles.cardRowGap}
                        />
                        <Subheading style={styles.fixedTextColor}>
                          25 sets done
                        </Subheading>
                      </View>

                      <View style={styles.cardRow}>
                        <Feather
                          name='layers'
                          size={24}
                          color='black'
                          style={styles.cardRowGap}
                        />
                        <Subheading style={styles.fixedTextColor}>
                          55 reps done
                        </Subheading>
                      </View>

                      <View style={styles.cardRow}>
                        <Fontisto
                          name='date'
                          size={24}
                          color='black'
                          style={styles.cardRowGap}
                        />
                        <Subheading style={styles.fixedTextColor}>
                          {formatStringDate(
                            new Date(
                              selectedDate?.dateString
                            ).toLocaleDateString('en-us')
                          )}
                        </Subheading>
                      </View>
                    </View>
                  </View>
                );
              }
              return null;
            })
          : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  calendar: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  workoutContainer: {
    flex: 1,
    backgroundColor: '#E9C46A',
    width: '60%',
    marginVertical: 20,
    padding: 20,
    borderRadius: 20,
    elevation: 5
  },
  emptyContainer: {
    flex: 1
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardBottom: {
    flexDirection: 'column',
    paddingTop: 5
  },
  cardRow: {
    flexDirection: 'row'
  },
  cardRowGap: {
    paddingRight: 10
  },
  fixedTextColor: {
    color: 'black'
  }
});

export default CalendarHistory;
