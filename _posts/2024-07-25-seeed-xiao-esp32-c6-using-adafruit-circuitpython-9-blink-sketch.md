---
title: "Seeed Xiao ESP32-C6 using Adafruit CircuitPython 9.1.1 blink sketch"
date: 2024-07-25 00:00:01
excerpt: How to get a Seeed Xiao ESP32-C6 board up and running with Adafruit CircuitPython 9.1.1 and blink an LED.
categories:
- Projects
tags:
- microcontroller
- ESP32
---

Note: Skip to the bottom to see the working example

**Long version:**

I was excited to try out the [Seeed Xiao ESP32-C6](https://wiki.seeedstudio.com/xiao_esp32c6_getting_started/). A $5 CAD tiny ESP32 microprocessor that supports touch pins and [I2S](https://en.wikipedia.org/wiki/I%C2%B2S) (Integrated Circuit Sound). It even supported [Adafruit CircuitPython](https://circuitpython.org/). My goal was to use it for a variation of the [Idea 002 - Keyboard Flute](https://blog.abluestar.com/idea002-keyboard-flute/) that uses capacitive touch pads instead of keyboard buttons.

I [designed and manufactured some boards](https://mastodon.social/@funvill/112794904538809666) using [KiCad](https://www.kicad.org/) with the [Seeed Xiao ESP32-C6 footprint](https://wiki.seeedstudio.com/xiao_esp32c6_getting_started/). Then order some boards from Seeed Studios.

After the boards arrived, I started down the journey to install [CircuitPython](https://circuitpython.org/) on these boards.

I discovered that the ESP32-C6 chip does not have support for native USB. This means you will **not see a USB drive** appear when you plug it into your computer.

To be able to run CircuitPython on the ESP32 you need to load the CircuitPython firmware via [ESPTools](https://github.com/espressif/esptool) and connect to the [CircuitPython Web Workflow Code Editor](https://learn.adafruit.com/getting-started-with-web-workflow-using-the-code-editor/overview) in a browser. [Adafruit](https://www.adafruit.com/) has done their best to make this as easy as possible but it was still a disappointment that I couldn't just save files to the USB drive like I do with the [Raspberry Pi Pico](https://www.raspberrypi.com/documentation/microcontrollers/raspberry-pi-pico.html)

I downloaded the latest version of the [CircuitPython frimware for Seeed Xiao ESP32C6](https://circuitpython.org/board/seeed_xiao_esp32c6/)

Then followed [Circuit Python with ESP32 Quick Start Guide](https://learn.adafruit.com/circuitpython-with-esp32-quick-start/command-line-esptool).

There were two gotchas that I found while following the guide.

1) Note: I could not get the Web Serial ESPTool to work. I needed to use the command line version

```bash
esptool --chip ESP32-C6 --port com25 erase_flash
esptool --chip ESP32-C6 --port com25 write_flash -z 0x0 adafruit-circuitpython-seeed_xiao_esp32c6-en_US-9.1.1.bin
```

2) Note: ESP32 does not support 5 GHz networks, so use your 2.4 GHz WIFI network

After I got the Web IDE working I tried to run the example blink sketch

```py
"""Not working Example. Blinks the built-in LED."""
"""!!! NOTE: This does NOT work on the ESP32 !!!"""
import time
import board
import digitalio

led = digitalio.DigitalInOut(board.LED)
led.direction = digitalio.Direction.OUTPUT

while True:
    led.value = not led.value
    time.sleep(0.5)
```

But that produced the following error

```txt
Traceback (most recent call last):
  File "code.py", line 7, in <module>
AttributeError: 'module' object has no attribute 'LED'
```

It didn't work because the board does not have a pin labeled LED. After some searching I found that you can print the board pins defined using the following command in the REPL.

```python
import board
dir(board)
['__class__', '__name__', 'A0', 'A1', 'A2', 'A4', 'A5', 'A6', 'D0', 'D1', 'D10', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'I2C', 'LP_I2C_SCL', 'LP_I2C_SDA', 'LP_UART_RXD', 'LP_UART_TXD', 'MISO', 'MOSI', 'MTCK', 'MTDI', 'MTDO', 'MTMS', 'RX', 'SCK', 'SCL', 'SDA', 'SPI', 'TX', 'UART', '__dict__', 'board_id']
```

I found the [SeeedStudio-XIAO-ESP32C6 Schematic](https://files.seeedstudio.com/wiki/SeeedStudio-XIAO-ESP32C6/XIAO-ESP32-C6_v1.0_SCH_PDF_24028.pdf) and the build in LED uses *GPIO15*. This doesn't seem to be avalaible as part of the board pin definitions.

After some more research I found that the [CircuitPython differentiates between *board* pins and internal *microcontroller* pins](https://github.com/adafruit/circuitpython/issues/5651#issuecomment-985626630).

Printing the pins found in the microcontroller.pin object produces the expected results.

```python
import microcontroller
dir(microcontroller.pin)
['__class__', 'GPIO0', 'GPIO1', 'GPIO10', 'GPIO11', 'GPIO12', 'GPIO13', 'GPIO14', 'GPIO15', 'GPIO16', 'GPIO17', 'GPIO18', 'GPIO19', 'GPIO2', 'GPIO20', 'GPIO21', 'GPIO22', 'GPIO23', 'GPIO24', 'GPIO25', 'GPIO26', 'GPIO27', 'GPIO28', 'GPIO29', 'GPIO3', 'GPIO30', 'GPIO4', 'GPIO5', 'GPIO6', 'GPIO7', 'GPIO8', 'GPIO9', '__dict__']
```

This is the working example. Hopfully it will save you some time in your projects.

```python
"""Working Example. Blinks the built-in LED."""
"""WORKING version for SeeedStudio-XIAO-ESP32C6"""
import time
import microcontroller
import digitalio

led = digitalio.DigitalInOut(microcontroller.pin.GPIO15)
led.direction = digitalio.Direction.OUTPUT

while True:
    led.value = not led.value
    time.sleep(0.5)
```
