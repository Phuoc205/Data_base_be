-- ************************************************************** --
-- **************************INSERT LAPTOP*********************** --
-- ************************************************************** --

INSERT INTO CATEGORY_LAPTOP 
(
  PRODUCT_ID, CPU, CORES, THREADS, CLOCK_RATE, BOOST_CLOCK, RAM, RAM_STANDARD, RAM_BUS_SPEED, MAX_RAM, STORAGE,
  SCREEN_SIZE, SCREEN_RESOLUTION, REFRESH_RATE, TECHNOLOGY, GPU, SOUND, INTERFACES, WIRELESS_CONNECTION, WEBCAM, OTHER_FEATURE,
  KEYBOARD_BACKLIGHT, DIMENSION, LAPTOP_WEIGHT, MATERIAL, BATTERY, OS, RELEASE_DATE
)
VALUES 
(
  'L001', 'Intel Core i7-1165G7', 4, 8, 2800, 4700, 16, 'DDR4', 3200, 32, 512,
  13, '1920x1080', 60, 'IPS', 'Intel Iris Xe', 'Waves MaxxAudio', '2x USB-C, 1x Thunderbolt', 'Wi-Fi 6', 'HD Webcam', 'Fingerprint',
  'Yes', '302x199x15mm', 1300, 'Aluminum', 63, 'Windows 11', '2023-08-01'
),

(
  'L002', 'Intel Core i3-1215U', 6, 8, 1200, 4400, 8, 'DDR4', 3200, 16, 512,
  15, '1920x1080', 60, 'IPS', 'Intel UHD Graphics', 'SonicMaster audio', 'USB Type-C, 1 x USB 2.0, 2 x USB 3.2, HDMI1x 3.5mm Audio', 'Wi-Fi 6E, Bluetooth 5.3', 'HD Webcam',
  '180° hinge, fingerprint, webcam cover', 'No', '359.7 x 232.5 x 17.9 mm', 'Plastic', 42, 'Windows 11', '2023-06-07'
),

(
  'L003', 'Intel Core Ultra 7 155H', 16, 22, 1400, 4800, 32, 'LPDDR5x',
  8533, 32, 2048, 14, '2880x1880', 60, 'OLED', 'Intel Arc Graphics',
  'Quad Speakers B&O', '2x Thunderbolt 4, 1x USB-A, 1x 3.5mm Audio', 'Wi-Fi 6E, Bluetooth 5.3',
  '4K Webcam', '2-in-1 Convertible', 'Yes', '12.4 x 8.7 x 0.7 inches', 1450, 'Aluminum',
  66, 'Windows 11', '2024-01-15'
),

(
  'L004', 'Intel Core i7-13620H', 10, 16, 2400, 4900, 16, 'DDR4',
  3200, 48, 512, 16, '1920x1200', 165, 'IPS', 'NVIDIA GeForce RTX 4050 6GB',
  'Stereo Speakers', '1x HDMI, 2x USB-C, 2x USB-A, 1x 3.5mm Audio', 'Wi-Fi 6E, Bluetooth 5.2',
  'HD Webcam', 'Anti-Glare Display', 'Yes', '35.5 x 24.3 x 1.99 cm', 2000, 'Aluminum', 90, 'Windows 11', '2023-06-01'
),

(
  'L005', 'Intel Core Ultra 7 155H', 16, 22, 1400, 4800, 32, 'DDR5',
  5600, 96, 512, 14, '1920x1200', 60, 'WUXGA IPS', 'NVIDIA RTX 500',
  'Stereo Speakers', '2x Thunderbolt 4, 2x USB-A, 1x HDMI, 1x RJ-45, 1x 3.5mm Audio',
  'Wi-Fi 6E, Bluetooth 5.2', 'HD Webcam', 'ThinkShutter Privacy Cover',
  'Yes', '315.9 x 223.7 x 17.7 mm', 1310, 'Carbon Fiber', 52.5, 'Windows 11 Pro', '2024-11-14'
),

(
  'L006', 'AMD Ryzen 5 7535HS', 6, 12, 3300 , 4550, 8, 'DDR5',
  4800, 96, 512, 15, '1920x1080', 144, 'IPS', 'AMD Radeon RX 6550M 4GB',
  'Dual Speakers', '1x USB-C, 2x USB-A, 1x HDMI, 1x RJ-45, 1x 3.5mm Audio',
  'Wi-Fi 6, Bluetooth 5.2', '720p Webcam', 'OMEN Gaming Hub, Mica Silver',
  'Yes', '35.79 x 25.5 x 2.35 cm', 2290, 'Plastic', 70, 'Windows 11 Home', '2024-03-10'
),

(
  'L007', 'Intel Core Ultra 7 155H', 16, 22, 1400, 4800, 16, 'LPDDR5X',
  6400, 16, 512, 14, '2880x1800', 120, 'OLED IPS', 'Intel Arc Graphics',
  'Stereo Speakers', '2x USB-C Thunderbolt 4, 2x USB-A 3.2 Gen 1, 1x HDMI 2.1, 1x 3.5mm Audio, 1x MicroSD Card Reader', 'Wi-Fi 7, Bluetooth 5.3',
  '1080p Webcam', 'Acer AI Zone, Copilot, MIL-STD-810H', 'Yes',
  '312.9 x 217.9 x 14.9 mm', 1300, 'Aluminum', 65, 'Windows 11', '2024-01-10'
),

(
  'L008', 'Intel Core i5-12450H', 8, 12, 2000, 4400, 16, 'DDR4',
  3200, 64, '512GB SSD', 15, '1920x1080', 144, 'IPS', 'NVIDIA GeForce RTX 3050',
  'Nahimic 3, Hi-Res Audio', '1x USB-C 3.2 Gen 1, 3x USB-A 3.2 Gen 1, 1x HDMI 2.0, 1x RJ-45, 1x 3.5mm Audio', 'Wi-Fi 6, Bluetooth 5.2',
  'HD Webcam', 'Red Backlit Keyboard, Thin Bezel', 'Yes',
  '359 x 254 x 21.7 mm', 1860, 'Aluminum', 51, 'Windows 11', '2024-01-10'
),

(
  'L009', 'Intel Core Ultra 5 125H', 14, 18, 1200, 4500, 16, 'LPDDR5',
  6400, 16, '512GB SSD', 14.0, '2880x1800', 120, 'IPS', 'Intel Arc Graphics',
  'Stereo Speakers', '2x USB-C (USB4, Thunderbolt 4), 1x USB-A 3.2 Gen 1, 1x HDMI 2.1, 1x 3.5mm Audio, 1x MicroSD Card Reader', 'Wi-Fi 7, Bluetooth 5.4',
  '1080p Webcam', 'Fingerprint Reader, Backlit Keyboard', 'Yes',
  '312.9 x 217.9 x 14.9 mm', 1300, 'Aluminum', 65, 'Windows 11', '2024-01-10'
),

(
  'L010', 'Intel Core i9-14900HX', 24, 32, 2200, 5800, 64, 'DDR5',
  6400, 128, '2TB SSD', 18.0, '3840x2160', 120, 'Mini LED', 'NVIDIA GeForce RTX 4090',
  'Dynaudio', '2x Thunderbolt 4, 3x USB-A 3.2 Gen 2, 1x HDMI 2.1, 1x RJ-45, 1x 3.5mm Audio', 'Wi-Fi 6E, Bluetooth 5.3',
  'FHD Webcam', 'Mechanical Keyboard, Per-Key RGB', 'Yes',
  '397 x 330 x 23 mm', 3100, 'Aluminum', 99.9, 'Windows 11', '2024-02-20'
);













