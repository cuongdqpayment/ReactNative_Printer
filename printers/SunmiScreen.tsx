import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter,
  ScrollView,
  Alert,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
/*/ @ts-ignore*/
/*/ @ts-ignore*/
import SunmiPrinter, { SunmiScan } from '@heasy/react-native-sunmi-printer';

export const SunmiScreen = () => {
  const [status, setStatus] = useState('');
  let QrRef: React.MutableRefObject<null> = useRef(null);

  useEffect(() => {
    let listener: any;

    try {
      listener = DeviceEventEmitter.addListener('PrinterStatus', action => {
        switch (action) {
          // case SunmiPrinter.Constants.NORMAL_ACTION:
          //   setStatus('printer normal');
          //   break;
          // case SunmiPrinter.Constants.OUT_OF_PAPER_ACTION:
          //   setStatus('printer out out page');
          //   break;
          // case SunmiPrinter.Constants.COVER_OPEN_ACTION:
          //   setStatus('printer cover open');
          //   break;
          default:
            setStatus('printer status:' + action);
        }
      });
    } catch (e: any) {
      setStatus(e);
      console.log(e);
    }

    return () => {
      if (listener) {
        listener.remove();
      }
    };
  }, []);

  const print = () => {
    let qr = '';
    const getDataURL = () => {
      // @ts-ignore
      QrRef?.toDataURL(callback);
    };

    const callback = async (dataURL: string) => {
      setStatus(dataURL);
      qr = dataURL;
      let logo = `/${qr}`;
      let logobase64 = logo.replace('data:image/jpeg;base64,', '');
      let orderList = [
        ['2024-09-05 15:00:00', '', ''],
        ['Some item x 1', '', ''],
        ['', '', '$100'],
        ['2024-09-05 15:00:00', '', ''],
        ['Some item x 1', '', ''],
        ['', '', '$100'],
      ];
      let columnAlignment = [0, 1, 2];
      let columnWidth = [25, 1, 5];
      try {
        //set aligment: 0-left,1-center,2-right
        await SunmiPrinter.setAlignment(1);

        //图片bitmap对象(最大宽度384像素，超过无法打印并且回调callback异常函数)
        await SunmiPrinter.printBitmap(qr, 384 /*width*/);
        //SunmiPrinter.commitPrinterBuffer();
        await SunmiPrinter.printOriginalText('\n\n');
        await SunmiPrinter.setFontSize(40);
        await SunmiPrinter.printOriginalText('Title name\n');
        await SunmiPrinter.setFontSize(50);
        await SunmiPrinter.printOriginalText('Subtitle name\n');
        await SunmiPrinter.setFontSize(20);
        await SunmiPrinter.setAlignment(0);
        await SunmiPrinter.printOriginalText('Receipt ID: 1234567890\n');
        await SunmiPrinter.printOriginalText(`Date: 2024-09-05 15:00:00\n`);
        await SunmiPrinter.printOriginalText(
          '===============================\n',
        );
        // await SunmiPrinter.setFontSize(22);
        // for (var i in orderList) {
        //   console.log(orderList[i]);
        //   console.log(columnWidth);
        //   console.log(columnAlignment);
        //   await SunmiPrinter.printColumnsText(
        //     orderList[i],
        //     columnWidth,
        //     columnAlignment,
        //   );
        // }
        // await SunmiPrinter.setFontSize(20);
        // await SunmiPrinter.printOriginalText(
        //   '===============================\n',
        // );
        // await SunmiPrinter.setAlignment(2);
        // await SunmiPrinter.setFontSize(30);
        // await SunmiPrinter.printOriginalText('Total: $200\n');
        // await SunmiPrinter.setFontSize(20);
        // await SunmiPrinter.printOriginalText(
        //   '===============================\n',
        // );
        await SunmiPrinter.printOriginalText('\n\n');
        // await SunmiPrinter.printBitmap(
        //   logobase64,
        //   384 /*width*/,
        //   380 /*height*/,
        // );
      } catch (e:any) {
        console.log(e);
      }
    };
    getDataURL();
  };

  const onSuccess = (e: any) => {

    console.log(JSON.stringify(e));
    
    // alert(JSON.stringify(e));
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err),
    // );
  };

  return (
    <ScrollView
      style={{
        flex: 1,
      }}>
      <View style={styles.container}>
        <Text>{`Printer Status: ${status}`}</Text>
        <TouchableOpacity style={styles.button} onPress={() => print()}>
          <Text style={styles.buttonText}>Print</Text>
        </TouchableOpacity>
        {/* <QRCode value="hey" getRef={(el: React.ReactElement) => (QrRef = el)} /> */}
      </View>
      {/*<QRCodeScanner*/}
      {/*  onRead={onSuccess}*/}
      {/*  flashMode={RNCamera.Constants.FlashMode.auto as any}*/}
      {/*  topContent={*/}
      {/*    <Text style={styles.centerText}>*/}
      {/*      Go to{' '}*/}
      {/*      <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on*/}
      {/*      your computer and scan the QR code.*/}
      {/*    </Text>*/}
      {/*  }*/}
      {/*  showMarker={true}*/}
      {/*  bottomContent={*/}
      {/*    <TouchableOpacity style={styles.buttonTouchable}>*/}
      {/*      <Text style={styles.buttonText}>OK. Got it!</Text>*/}
      {/*    </TouchableOpacity>*/}
      {/*  }*/}
      {/*/>*/}
      {/* <SunmiScannerView
        style={{ height: 400, width: 300 }}
        onCodeScan={(data: any) => {
          Alert.alert(JSON.stringify(data));
        }}
      /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 50,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'steelblue',
  },
  buttonText: {
    color: 'white',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonTouchable: {
    padding: 16,
  },
});

