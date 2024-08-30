# T.T. Software Solution Landing Page

## Description

This repository contains the source code for the T.T. Software Solution Landing Page. The landing page is designed to provide an engaging and informative introduction to T.T. Software Solution's services and offerings. It is built using modern web development technologies to ensure a responsive and user-friendly experience.

## Setup Development Environment

### IDE

**[Visual Studio Code](https://code.visualstudio.com/download)**

ในส่วนของ VSCode Extension ที่แนะนำ สามารถค้นหาได้โดยการเปิดแท็บ Extensions(ctrl+shift+x) และค้นหาคำว่า `@recommended` จะมี extensions โผล่ขึ้นมาในหัวข้อของ WORKSPACE RECOMMENDATIONS สามารถเลือกติดตั้งได้ตามต้องการเลย(ไม่จำเป็นต้องติดตั้งทั้งหมด)

### Runtime

**[Node.js](https://nodejs.org/en)**

ในส่วนของ Node.js ให้เลือกติดตั้งเวอร์ชั่น LTS (Long Term Support) หรือ Current (Latest Features) ก็ได้ แต่ในการพัฒนาโปรแกรมจะแนะนำให้ใช้ LTS เพื่อให้มั่นใจว่าจะไม่มีปัญหาในการรันโปรแกรมในเวอร์ชันที่ต่างกัน
ซึ่งในโปรเจกต์นี้ใช้ Node.js เวอร์ชัน 20

> สามารถตรวจสอบเวอร์ชั่น Node.js ได้โดยการรันคำสั่ง `node -v` ใน Terminal

> การเปลี่ยนเวอร์ชันของ Node.js จะยุ่งยากนิดนึง **อยากแนะนำให้ติดตั้ง Node.js ผ่าน เครื่องมืออื่น ๆ เช่น [Volta(Windows/Unix)](https://volta.sh/), [asdf(Unix)](https://asdf-vm.com/) หรือ [mise(Unix)](https://mise.jdx.dev/) เป็นต้น** เครื่องมือเหล่านี้จะช่วยให้คุณสามารถเปลี่ยนเวอร์ชันของ Node.js ได้อย่างง่ายดายเพียงไม่กี่คำสั่ง

### Package Manager

**[Bun](https://bun.sh/docs/installation)**

ในส่วนของโปรเจกต์นี้ เราจะใช้ Bun เป็นตัวจัดการ Package ของโปรเจกต์ เพื่อให้สามารถติดตั้ง package ที่จำเป็นต่อการพัฒนาโปรเจกต์ได้อย่างง่ายดาย และรวดเร็ว

## Setup Project

### Clone Project

- ขั้นตอนแรกให้ทำการ Clone Project ลงในเครื่องของคุณ

  ```bash
  $ git clone https://github.com/T-T-Software-Solution/landing.git
  ```

### Install Packages

- ติดตั้ง package ที่จำเป็นต่อการพัฒนาโปรเจกต์ โดยคำสั่งนี้จะทำการติดตั้ง package ทั้งหมดที่อยู่ในไฟล์ [package.json](/package.json) และจะเก็บไว้ในโฟลเดอร์ `node_modules`

  ```bash
  $ bun install
  # หรือ
  $ npm install
  ```
  
### Run Development Server

- หลังจากติดตั้ง package เสร็จเรียบร้อยแล้ว ให้รันคำสั่งต่อไปนี้เพื่อรันเว็บไซต์บนเครื่องของคุณ

  ```bash
  $ bun dev
  # หรือ
  $ npm run dev
  ```

- เมื่อเซิร์ฟเวอร์เริ่มทำงานแล้ว คุณสามารถเปิดเบราว์เซอร์และเข้าไปที่ `http://localhost:4321` เพื่อดูผลลัพธ์ของโปรเจกต์

### Build Project

- เมื่อพัฒนาโปรเจกต์เสร็จเรียบร้อยแล้ว คุณสามารถสร้างไฟล์สำหรับการ deploy โดยใช้คำสั่งต่อไปนี้

  ```bash
  $ bun run build
  # หรือ
  $ npm run build
  ```

- ไฟล์ที่ถูกสร้างขึ้นจะถูกเก็บไว้ในโฟลเดอร์ `dist` ซึ่งสามารถนำไป deploy บนเซิร์ฟเวอร์จริงได้

### Preview Production Build

- คุณสามารถทดสอบการทำงานของโปรเจกต์ในสภาพแวดล้อม production โดยใช้คำสั่งต่อไปนี้

  ```bash
  $ bun run preview
  # หรือ
  $ npm run preview
  ```

- คำสั่งนี้จะทำการรันเซิร์ฟเวอร์ขึ้นมาโดย มันจะทำการอ่านไฟล์ที่ถูกสร้างขึ้นมาในโฟลเดอร์ `dist` และจะทำการรันเซิร์ฟเวอร์บนเครื่องของคุณ ซึ่งคุณสามารถเข้าไปที่ `http://localhost:4321` เพื่อดูผลลัพธ์ของโปรเจกต์ได้
