import { View, Text, ScrollView, Switch } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../../components/Button/CustomButton';
import { makeStyles } from '../../hooks/makeStyle';
import { useTranslation } from 'react-i18next';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/feature/authSlice';
import { RootState } from '../../redux/store';
import { checkinFunc, checkout } from '../../redux/feature/checkinSlice';
import { storeLang } from '../../redux/feature/langSlice';
import i18n from '../../../i18n';

const last7DayData = [
    {
        date: '12 Mar 2024',
        checkin: '09: 00 AM',
        checkout: '06: 00 PM',
    },
    {
        date: '12 Mar 2024',
        checkin: '08: 50 AM',
        checkout: '05: 00 PM',
    },
    {
        date: '12 Mar 2024',
        checkin: '08: 00 AM',
        checkout: '05: 30 PM',
    },
    {
        date: '12 Mar 2024',
        checkin: '09: 00 AM',
        checkout: '06: 00 PM',
    },
    {
        date: '12 Mar 2024',
        checkin: '09: 00 AM',
        checkout: '06: 00 PM',
    },
    {
        date: '12 Mar 2024',
        checkin: '09: 00 AM',
        checkout: '06: 00 PM',
    },
    {
        date: '12 Mar 2024',
        checkin: '09: 00 AM',
        checkout: '06: 00 PM',
    },
];

const Dashboard = () => {
    const { t } = useTranslation();
    const tableHead = [t('Date'), t('CheckIn'), t('CheckOut')];
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: t('DateRange7Days'), value: t('DateRange7Days') },
        { label: t('DateRange14Days'), value: t('DateRange14Days') },
    ]);

    const dispatch = useDispatch();

    const checkin = useSelector((state: RootState) => state.checkin);
    const lang = useSelector((state: RootState) => state.lang);

    const [value, setValue] = useState(items[0].value);
    const [isEn, setIsEn] = useState(lang.lang === 'en' ? true : false);

    const handleCheckin = () => {
        if (!checkin.isCheckedIn) {
            dispatch(checkinFunc());
        } else {
            dispatch(checkout());
        }
    };

    const styles = useStyle({ isCheckedIn: checkin.isCheckedIn });
    return (
        <View style={styles.cont}>
            <View style={styles.titleCont}>
                <Text style={styles.title}>{`${t('Hello')}, Allen`}</Text>
                <View style={styles.switchCont}>
                    <Text style={styles.switchText}>bn</Text>
                    <Switch
                        style={styles.switch}
                        value={isEn}
                        onValueChange={() => {
                            setIsEn(!isEn);
                            i18n.changeLanguage(isEn ? 'bn' : 'en');
                            dispatch(storeLang(isEn ? 'bn' : 'en'));
                        }}
                    />
                    <Text style={styles.switchText}>en</Text>
                </View>
            </View>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />
            <Text style={styles.tableLabel}>
                {t('CheckInTitle', { days: value })}
            </Text>
            <View style={styles.tableCont}>
                <View style={styles.tableHeadCont}>
                    {tableHead.map((item, index) => (
                        <Text key={index} style={styles.tableTitle}>
                            {item}
                        </Text>
                    ))}
                </View>
                <ScrollView>
                    {last7DayData.map((rowData, index) => (
                        <View key={index} style={styles.tableBodyCont}>
                            {Object.values(rowData).map((item, colIndex) => (
                                <Text
                                    key={colIndex}
                                    style={styles.tableBodyText}>
                                    {item}
                                </Text>
                            ))}
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.footerCont}>
                <CustomButton
                    title={checkin.isCheckedIn ? t('CheckOut') : t('CheckIn')}
                    style={styles.checkIn}
                    onPress={handleCheckin}
                />
                <CustomButton
                    title={t('Logout')}
                    style={styles.logout}
                    onPress={() => {
                        dispatch(logout());
                    }}
                />
            </View>
        </View>
    );
};

export default Dashboard;

interface StyleProps {
    isCheckedIn: boolean;
}

const useStyle = makeStyles((theme, props: StyleProps) => ({
    cont: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: theme.background[90],
    },
    titleCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 16,
    },
    title: {
        fontSize: 26,
        color: theme.black,
        fontWeight: 'bold',
    },
    switchCont: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        padding: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.border[100],
    },
    switchText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    switch: {},
    tableLabel: {
        fontSize: 16,
        fontWeight: '900',
        marginTop: 16,
    },
    tableCont: {
        marginTop: 12,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: theme.border[100],
    },
    tableHeadCont: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: theme.background[80],
    },
    tableTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
    tableBodyCont: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: theme.border[100],
    },
    tableBodyText: { flex: 1, textAlign: 'center' },
    footerCont: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: 20,
        marginBottom: 20,
    },
    checkIn: {
        backgroundColor: props.isCheckedIn
            ? theme.background[70]
            : theme.background[100],
        width: '45%',
        borderRadius: 30,
    },
    logout: {
        backgroundColor: theme.background[100],
        width: '45%',
        borderRadius: 30,
    },
}));
