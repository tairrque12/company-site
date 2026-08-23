-- Adds full content (about_role, responsibilities, requirements, bonus_qualifications,
-- compensation) to the Robotics job postings seeded in V3. V3 is immutable since it's
-- already applied — this migration updates the existing rows by req_id instead.

UPDATE job_posting SET
                       about_role = 'Manipulation is one of the hardest unsolved problems in robotics. You will build the perception and control models that let RIQ grasp, handle, and interact with objects it has never seen before, working across the full pipeline from raw sensor data to executed motion.',
                       responsibilities = E'Design and train models for grasp planning and dexterous manipulation\nBuild data pipelines from teleoperation and simulation for manipulation training\nWork closely with the Locomotion & Controls team to unify whole-body behavior\nEvaluate manipulation performance against real-world object sets and edge cases',
                       requirements = E'Strong background in machine learning, robotics, or computer vision\nExperience with reinforcement learning or imitation learning\nComfortable working across the stack from data collection to deployed models\nProficiency in Python and a deep learning framework (PyTorch preferred)',
                       bonus_qualifications = E'Experience with tactile or force sensing\nPublished research in robotic manipulation or grasping',
                       salary_min = 170000,
                       salary_max = 280000
WHERE req_id = 'RIQ-2001';

UPDATE job_posting SET
                       about_role = 'Before RIQ takes a single real step, it takes millions of simulated ones. You will build and maintain the physics-accurate simulation environments used to train and validate every behavior — locomotion, manipulation, and everything in between — before it ever touches hardware.',
                       responsibilities = E'Build and maintain high-fidelity physics simulation environments\nImplement domain randomization to close the sim-to-real gap\nWork with AI teams to integrate simulation into training pipelines\nProfile and optimize simulation performance for large-scale parallel training',
                       requirements = E'Experience with physics engines (MuJoCo, Isaac Sim, or similar)\nStrong software engineering fundamentals in C++ or Python\nUnderstanding of rigid body dynamics and contact modeling\nComfortable working in a fast-moving, research-adjacent environment',
                       bonus_qualifications = E'Experience with GPU-accelerated simulation\nBackground in sim-to-real transfer for robotics',
                       salary_min = 160000,
                       salary_max = 260000
WHERE req_id = 'RIQ-2002';

UPDATE job_posting SET
                       about_role = 'RIQ''s actuators are what turn intent into motion. You will design and iterate on the actuator assemblies that give RIQ its range of motion, balancing power density, precision, and durability under real-world repeated use.',
                       responsibilities = E'Design and iterate on actuator assemblies for joints across the full body\nRun physical testing to characterize performance and durability under load\nCollaborate with controls engineers to validate designs against real motion data\nDrive design for manufacturability as the platform moves toward production',
                       requirements = E'Experience designing mechanical systems for robotics, automotive, or aerospace\nStrong grasp of kinematics, structural design, and tolerance analysis\nProficiency with CAD (SolidWorks, NX, or similar)\nComfortable iterating quickly between design and physical prototyping',
                       bonus_qualifications = E'Experience with harmonic drives, cycloidal drives, or direct-drive actuators\nBackground in high-power-density electromechanical design',
                       salary_min = 150000,
                       salary_max = 250000
WHERE req_id = 'RIQ-2003';

UPDATE job_posting SET
                       about_role = 'Every actuator, sensor, and battery in RIQ has to live somewhere. You will design the structural frame and enclosures that hold the whole platform together — strong enough to survive real-world use, light enough to keep the robot agile.',
                       responsibilities = E'Design structural components, frames, and enclosures across the platform\nRun FEA to validate structural integrity under expected loads\nDefine material selections and manufacturing processes for structural parts\nWork with electrical and actuator teams to ensure components fit and integrate cleanly',
                       requirements = E'Bachelor''s in mechanical engineering or similar\nExperience with structural design and finite element analysis\nProficiency with CAD and familiarity with sheet metal, CNC, and injection molding processes\nComfortable balancing strength, weight, and manufacturability tradeoffs',
                       salary_min = 140000,
                       salary_max = 230000
WHERE req_id = 'RIQ-2004';

UPDATE job_posting SET
                       about_role = 'A humanoid robot lives or dies by its power budget. You will design the battery, power distribution, and charging systems that keep RIQ running through a full day of real-world operation.',
                       responsibilities = E'Design battery pack architecture and power distribution systems\nWork on charging systems and power management firmware\nRun thermal and safety analysis on power electronics\nCollaborate with mechanical engineering to package power systems efficiently',
                       requirements = E'Experience with battery systems, power electronics, or electric vehicle power design\nStrong understanding of power distribution and thermal management\nFamiliarity with relevant safety and regulatory standards\nComfortable working closely with mechanical and firmware teams',
                       bonus_qualifications = E'Experience with lithium-ion battery management systems (BMS)\nBackground in high-density power packaging for mobile robotics',
                       salary_min = 155000,
                       salary_max = 255000
WHERE req_id = 'RIQ-2005';

UPDATE job_posting SET
                       about_role = 'RIQ has to think and react in real time, entirely onboard. You will build the embedded systems and low-level software that run on RIQ''s onboard compute, bridging sensors, actuators, and the higher-level AI stack.',
                       responsibilities = E'Develop low-level firmware for sensor and actuator interfaces\nOptimize onboard compute for real-time performance under strict power and thermal budgets\nWork with hardware teams to bring up new compute and sensor boards\nDebug system-level issues across the hardware/software boundary',
                       requirements = E'Experience with embedded C/C++ and real-time operating systems\nUnderstanding of hardware/software co-design and low-level debugging\nFamiliarity with communication protocols (CAN, SPI, I2C, EtherCAT)\nComfortable working close to the metal on resource-constrained systems',
                       salary_min = 145000,
                       salary_max = 240000
WHERE req_id = 'RIQ-2006';

UPDATE job_posting SET
                       about_role = 'Walking is deceptively hard. You will build the locomotion software that lets RIQ walk, balance, and recover from disturbances across varied real-world terrain, without a manual fallback.',
                       responsibilities = E'Develop and maintain real-time locomotion and balance control systems\nDesign gait generation and terrain-adaptive walking algorithms\nWork closely with simulation and AI teams to validate behavior before hardware deployment\nDebug and resolve locomotion edge cases surfaced from real-world testing',
                       requirements = E'Strong experience with C++ in a real-time systems context\nBackground in robotics, controls, or motion planning\nUnderstanding of legged locomotion and balance control\nComfortable working across the full stack from planning to low-level control',
                       bonus_qualifications = E'Experience with legged robot locomotion specifically (bipedal or quadrupedal)\nPublished research in robot locomotion or balance control',
                       salary_min = 165000,
                       salary_max = 270000
WHERE req_id = 'RIQ-2007';

UPDATE job_posting SET
                       about_role = 'Every joint in RIQ has to move in coordination with every other joint. You will develop the real-time control loops that unify balance, posture, and movement across the entire body into a single coherent system.',
                       responsibilities = E'Design whole-body control architectures that coordinate dozens of actuators in real time\nImplement and tune control loops for stability and responsiveness\nWork with mechanical and AI teams to validate control performance against hardware limits\nAnalyze and resolve stability issues under real-world disturbances',
                       requirements = E'Strong background in control theory and real-time systems\nExperience with whole-body or multi-joint robotic control\nProficiency in C++ and control system design tools\nComfortable working at the intersection of theory and hands-on hardware testing',
                       salary_min = 160000,
                       salary_max = 265000
WHERE req_id = 'RIQ-2008';

UPDATE job_posting SET
                       about_role = 'Building one RIQ in a lab and building thousands for customers are entirely different problems. You will own the assembly-line process that builds and tests each unit, turning a research platform into a producible product.',
                       responsibilities = E'Design and optimize the general assembly line for RIQ production\nDrive design-for-manufacturability feedback with mechanical and electrical teams\nDevelop and validate assembly and test procedures for production quality\nIdentify and resolve production bottlenecks as volume scales',
                       requirements = E'Experience in manufacturing engineering for complex electromechanical products\nStrong understanding of DFM and DFA principles\nComfortable working hands-on on the production floor\nExperience scaling a product from low-volume to production',
                       bonus_qualifications = E'Experience in robotics, automotive, or consumer hardware manufacturing\nBackground in automated or semi-automated assembly systems',
                       salary_min = 140000,
                       salary_max = 230000
WHERE req_id = 'RIQ-2009';

UPDATE job_posting SET
                       about_role = 'RIQ is made of hundreds of precision components sourced from suppliers around the world. You will build the supply chain that keeps production running — sourcing, qualifying, and managing the vendors behind every part.',
                       responsibilities = E'Source and qualify suppliers for mechanical, electrical, and structural components\nManage supplier relationships and resolve quality or delivery issues\nWork with manufacturing engineering to align supply with production ramp\nBuild forecasting and inventory processes to support scaling production',
                       requirements = E'Experience in supply chain or procurement for hardware products\nStrong negotiation and vendor management skills\nComfortable working cross-functionally with engineering and manufacturing\nWillingness to travel to supplier and manufacturing facilities as needed',
                       salary_min = 130000,
                       salary_max = 210000
WHERE req_id = 'RIQ-2010';

UPDATE job_posting SET
                       about_role = 'Once RIQ is deployed, it has to keep working. You will build the tooling and processes that let us monitor, update, and support a growing fleet of robots operating in the field.',
                       responsibilities = E'Build monitoring and observability tooling for deployed RIQ units\nDevelop remote diagnostic and over-the-air update systems\nAnalyze fleet-wide data to identify recurring issues before they become incidents\nWork with customer-facing teams to triage and resolve field issues',
                       requirements = E'Experience with fleet management, observability, or DevOps tooling\nStrong software engineering fundamentals\nComfortable working with large-scale telemetry data\nExperience supporting hardware products in the field is a plus',
                       bonus_qualifications = E'Experience with IoT fleet management at scale\nBackground in robotics or autonomous systems operations',
                       salary_min = 145000,
                       salary_max = 235000
WHERE req_id = 'RIQ-2011';

UPDATE job_posting SET
                       about_role = 'The first robots we deploy to real customers are where theory meets reality. You will work directly with early customers to deploy RIQ, diagnose issues on-site, and feed what you learn back into the product.',
                       responsibilities = E'Lead on-site deployment and setup of RIQ units at customer locations\nDiagnose and resolve hardware and software issues in real-world environments\nBuild feedback loops between customer deployments and engineering teams\nDevelop deployment playbooks as the customer base scales',
                       requirements = E'Comfortable working hands-on with complex hardware in unpredictable environments\nStrong troubleshooting skills across mechanical, electrical, and software systems\nExcellent communication skills for working directly with customers\nWillingness to travel to customer sites as needed',
                       salary_min = 135000,
                       salary_max = 220000
WHERE req_id = 'RIQ-2012';