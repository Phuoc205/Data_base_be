-- ************************************************************** --
-- **************************INSERT CASE PC********************** --
-- ************************************************************** --

INSERT INTO CATEGORY_CASEPC
(
  PRODUCT_ID, CASE_TYPE, NUM_PORTS, FANS,
  CONNECTION_PORTS, MATERIAL, COLOR, DIMENSION, MBOARD_SIZE
)
VALUES 
('CASE001', 'Mid Tower', 4, '3x 120mm Front, 1x 120mm Rear', '2x USB 3.0, 1x Audio', 'Steel + Tempered Glass', 'Black', '450 x 210 x 480 mm', 'ATX'),

('CASE002', 'Mini Tower', 2, '1x 120mm Rear', '1x USB 3.0, 1x Audio', 'Aluminum', 'White', '330 x 180 x 360 mm', 'Mini-ITX'),

('CASE003', 'Full Tower', 6, '3x 140mm Front, 1x 140mm Top, 1x 140mm Rear', '4x USB 3.0, 1x USB-C, Audio', 'Steel', 'Black', '600 x 250 x 550 mm', 'E-ATX'),

('CASE004', 'Mid Tower', 5, '4x 120mm ARGB Fans', '2x USB 3.0, RGB Controller', 'Steel + Glass', 'Black', '460 x 220 x 470 mm', 'ATX'),

('CASE005', 'Mid Tower', 4, '2x 140mm Front, 1x 120mm Rear', '2x USB 3.0, 1x USB 2.0', 'Mesh Steel', 'White', '440 x 210 x 470 mm', 'ATX, Micro-ATX'),

('CASE006', 'Mini ITX', 2, '1x 92mm Rear', '1x USB-C, 1x USB 3.0', 'Aluminum', 'Gray', '280 x 130 x 250 mm', 'Mini-ITX'),

('CASE007', 'Full Tower', 6, 'No Fans Included (Custom Setup)', '4x USB 3.0, 1x USB-C', 'Steel + Acrylic', 'Black', '600 x 280 x 580 mm', 'E-ATX'),

('CASE008', 'Micro Tower', 3, '1x 120mm Rear', '2x USB 2.0, Audio', 'SECC', 'Black', '400 x 180 x 420 mm', 'Micro-ATX'),

('CASE009', 'Mini Tower (Fanless)', 2, 'None (Passive Cooling)', '1x USB-C, 2x USB 3.0', 'Aluminum', 'Silver', '320 x 160 x 350 mm', 'Mini-ITX'),

('CASE010', 'Open Frame', 4, 'Customizable Layout', 'Modular Ports', 'Steel + Acrylic', 'Black', '500 x 250 x 480 mm', 'ATX, Micro-ATX');