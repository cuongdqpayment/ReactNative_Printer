import EscPos from "./PrinterEscPos";

const design = `
D0004           {<>}           Table #: A1
------------------------------------------
[ ] Espresso
    - No sugar, Regular 9oz, Hot
                              {H3} {R} x 1
------------------------------------------
[ ] Blueberry Cheesecake
    - Slice
                              {H3} {R} x 1

{QR[Where are the aliens?]}
{BC[Your barcode here]}
{IMG[file://image/path/file.png]}
`;

 export async function testPrinter(){
     try {
    // Can be `network` or `bluetooth`
    console.log("xxxx in khong?")
    EscPos.setConfig({ type: "network" });
    // Connects to your printer
    // If you use `bluetooth`, second parameter is not required.
    await EscPos.connect("192.168.10.150", 9100);

    // Once connected, you can setup your printing size, either `PRINTING_SIZE_58_MM`, `PRINTING_SIZE_76_MM` or `PRINTING_SIZE_80_MM`
    EscPos.setPrintingSize(EscPos.PRINTING_SIZE_80_MM);
    // 0 to 8 (0-3 = smaller, 4 = default, 5-8 = larger)
    EscPos.setTextDensity(8);
    // Test Print
    await EscPos.printSample();
    // Cut half!
    await EscPos.cutPart();
    // You can also print image! eg. "file:///longpath/xxx.jpg"
    await EscPos.printImage(file.uri);
    // You can also print image with a specific width offset (scale down image by offset pixels)! eg. "file:///longpath/xxx.jpg"
    await EscPos.printImageWithOffset(file.uri, offset);
    // Print your design!
    await EscPos.printDesign(design);
    // Print QR Code, you can specify the size
    await EscPos.printQRCode("Proxima b is the answer!", 200);
    // Print Barcode
    // printBarCode({code}, {type}, {width}, {height}, {font}, {fontPosition})
    // type: 65=UPC-A; 66=UPC-E; 67=EAN13; 68=EAN8; 69=CODE39; 70=ITF; 71=CODABAR; 72=CODE93; 73=CODE128}
    // width: 2-6
    // height: 0-255
    // font: 0=FontA; 1=FontB
    // fontPosition: 0=none; 1=top; 2=bottom; 3=top-bottom
    await EscPos.printBarcode("Your barcode here", 73, 3, 100, 0, 2);
    // Cut full!
    await EscPos.cutFull();
    // Beep!
    await EscPos.beep();
    // Kick the drawer! Can be either `kickCashDrawerPin2` or `kickCashDrawerPin5`
    await EscPos.kickCashDrawerPin2();
    // Disconnect
    await EscPos.disconnect();
  } catch (error) {
    console.error(error);
  }
}