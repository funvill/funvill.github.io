---
title: "USB-C PD Power Bank to Resmed AirMini or Airsense CPAP"
date: 2024-03-09 00:01:00
excerpt: Is it cheaper to build your own solution to portable CPAP battery, or buy something off the shelf?
categories:
- Tips
- Electronics
tags:
- CPAP
- USB-C
- DIY
---

This is a classic "DIY or Buy" Maker problem

## Problem

I am planning on going on a three week road trip for the [April 2024 Eclipse](https://www.timeanddate.com/eclipse/map/2024-april-8). I am planning on sleeping in my vehicle most nights. At night I won't have access to AC power.

I use a [CPAP](https://en.wikipedia.org/wiki/Continuous_positive_airway_pressure) to get proper nights sleep. The CPAP requires AC Power to operate.

I have both the [Resmed AirMini](https://www.resmed.com/en-us/sleep-apnea/cpap-parts-support/sleep-apnea-full-products-list/cpap-machines/airmini-portable-cpap/) (built for travel) or [Resmed Airsense 11](https://www.resmed.com/en-us/sleep-apnea/cpap-parts-support/sleep-apnea-full-products-list/cpap-machines/airsense-11/) (heated hose and humidity control). There are purpose built off the shelf batteries for these devices that last around 13 hour and costs $700 USD.

## Question

Is it cheaper to build my own battery or buy an purpose built off the shelf batteries?

## TL;DR

Its cheaper and better in almost all ways to build your own version.

## The Journey

The first easy solution is to buy a [Jackey Portable Power Station](https://ca.jackery.com/). It giant battery with an 12v DC to 120v AC inverter, with some extra smarts. They cost around $450. It dead simple and would just work. That half the costs off to a good start. The issue is that they are bulky and hard to fly with. I figured that I could build a DIY solution for half this price.

The next idea is to use a USB-C PD power bank. They are easy to find at any store that sells electronics (Walmart, Amazon), easy to charge (Standard USB-C), small enough to carry on a airplane (<100W) and the PD (Power Delivery) standard can output 20V at 5A (100W). [All about USB-C PD standard](https://hackaday.com/2023/01/09/all-about-usb-c-power-delivery/)

According to the adapter the Resmed AirMini requires 24V at 0.83A (20W), and the Resmed Airsense 11 requires 24v at 2.71A (65.04W). Actual power testing shows that Airsense 11 only needs 1.2A when the heated hose and humidifier are disabled.

To get USB-C PD devices to give me 20V I need a "20V USB PD Trigger cable". This device negotiates with a USB supply to tell it what voltage to output and then passes that through.

I then can use a DC-DC boost converter (80% efficiency) to up the voltage to 24V that is required to power the CPAP machines. $3

Resmed CPAP devices uses a proprietary plug but you can [Resmed DC output](https://www.amazon.ca/ResMed-AirSense-Cable-Medistrom-Pilot-24/dp/B0B3F7ZY65) cable on Amazon for around $30 CAD.

One of the nice features of this solution is that I can use a off the shelf USB-C PD power bank as the battery. On a normal day when I am out and about I can use the USB-C PD power bank to power my laptop while in a coffee shop. A 'nice to have' would be Wireless Qi Charging and magsafe compatible.

Most USB-C PD power banks have a 10 Ah battery. That would last me just under 8 hours. Ideally I would want a battery with 12-15 Ah.

- $170 USD [HyperJuice 245W USB-C Battery Pack](https://www.hypershop.com/products/hyperjuice-245w-usb-c-battery-pack) - Has a whopping 27 Ah batteries but is price accordingly.
- $149 USD [Anker 737 Power Bank](https://www.anker.com/ca/products/b1290) - Is 24 Ah from a company that I know makes good batteries.
- There is a lot of choices on Amazon for unknown brands for < $80 CAD

This solution would look something like this:

USB-C PD Power bank => 20V USB-C PD Trigger cable => DC-DC 24v boost converter => Barrel jack to Resmed proprietary plug => CPAP machine.

During the day, while I am driving, I can charge the USB-C PD power bank using the vehicles standard 12v accessory jacks.

### Costs

- $15 - [20V USB PD Trigger cable](https://www.amazon.ca/ResMed-AirSense-Cable-Medistrom-Pilot-24/dp/B0B3F7ZY65)
- $30 - [Resmed DC output cable](https://www.amazon.ca/ResMed-AirSense-Cable-Medistrom-Pilot-24/dp/B0B3F7ZY65)
- $3 - DC-DC 24 boost converter
- $100 - USB-C PD Power bank

Total: ~$150

Conclusion: Cheaper to DIY
