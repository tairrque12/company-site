-- Department
INSERT INTO department (name, slug, tagline, description)
VALUES (
           'ROBOTICS',
           'robotics',
           'Engineer The Impossible. Build The Next Generation Of Humanoid Robots.',
           'We develop and deploy humanoid robots at scale. We''re solving some of the hardest problems in robotics—from perception and planning to manipulation, ' ||
           'locomotion, and real-time control—to build machines capable of operating in the real world. We believe advanced AI, efficient inference, and tightly integrated hardware are the foundation for truly general-purpose humanoid robots. Join us in building the next generation of intelligent machines.'
       );

-- Teams under Robotics
INSERT INTO team (department_id, name, slug)
SELECT id, 'AI & Robotics', 'ai-robotics' FROM department WHERE slug = 'robotics';

INSERT INTO team (department_id, name, slug)
SELECT id, 'Mechanical Engineering', 'mechanical-engineering' FROM department WHERE slug = 'robotics';

INSERT INTO team (department_id, name, slug)
SELECT id, 'Electrical & Compute', 'electrical-compute' FROM department WHERE slug = 'robotics';

INSERT INTO team (department_id, name, slug)
SELECT id, 'Software & Controls', 'software-controls' FROM department WHERE slug = 'robotics';

INSERT INTO team (department_id, name, slug)
SELECT id, 'Manufacturing & Operations', 'manufacturing-operations' FROM department WHERE slug = 'robotics';

INSERT INTO team (department_id, name, slug)
SELECT id, 'Product & Deployment', 'product-deployment' FROM department WHERE slug = 'robotics';

-- AI & Robotics roles
INSERT INTO job_posting (team_id, title, location, is_remote, job_type, req_id, active)
SELECT t.id, 'AI Engineer, Manipulation', 'Austin, TX', false, 'FULL_TIME', 'RIQ-2001', true
FROM team t WHERE t.slug = 'ai-robotics';

INSERT INTO job_posting (team_id, title, location, is_remote, job_type, req_id, active)
SELECT t.id, 'Simulation Software Engineer', NULL, true, 'FULL_TIME', 'RIQ-2002', true
FROM team t WHERE t.slug = 'ai-robotics';

-- Mechanical Engineering roles
INSERT INTO job_posting (team_id, title, location, is_remote, job_type, req_id, active)
SELECT t.id, 'Mechanical Engineer, Actuators', 'Austin, TX', false, 'FULL_TIME', 'RIQ-2003', true
FROM team t WHERE t.slug = 'mechanical-engineering';

INSERT INTO job_posting (team_id, title, location, is_remote, job_type, req_id, active)
SELECT t.id, 'Mechanical Engineer, Structures', 'Austin, TX', false, 'FULL_TIME', 'RIQ-2004', true
FROM team t WHERE t.slug = 'mechanical-engineering';

-- Electrical & Compute roles
INSERT INTO job_posting (team_id, title, location, is_remote, job_type, req_id, active)
SELECT t.id, 'Electrical Engineer, Power Systems', 'Austin, TX', false, 'FULL_TIME', 'RIQ-2005', true
FROM team t WHERE t.slug = 'electrical-compute';

INSERT INTO job_posting (team_id, title, location, is_remote, job_type, req_id, active)
SELECT t.id, 'Embedded Systems Engineer, Onboard Compute', 'Austin, TX', false, 'FULL_TIME', 'RIQ-2006', true
FROM team t WHERE t.slug = 'electrical-compute';

-- Software & Controls roles
INSERT INTO job_posting (team_id, title, location, is_remote, job_type, req_id, active)
SELECT t.id, 'Robotics Software Engineer, Locomotion', 'Austin, TX', false, 'FULL_TIME', 'RIQ-2007', true
FROM team t WHERE t.slug = 'software-controls';

INSERT INTO job_posting (team_id, title, location, is_remote, job_type, req_id, active)
SELECT t.id, 'Controls Engineer, Whole-Body Dynamics', 'Austin, TX', false, 'FULL_TIME', 'RIQ-2008', true
FROM team t WHERE t.slug = 'software-controls';

-- Manufacturing & Operations roles
INSERT INTO job_posting (team_id, title, location, is_remote, job_type, req_id, active)
SELECT t.id, 'Manufacturing Engineer, General Assembly', 'Austin, TX', false, 'FULL_TIME', 'RIQ-2009', true
FROM team t WHERE t.slug = 'manufacturing-operations';

INSERT INTO job_posting (team_id, title, location, is_remote, job_type, req_id, active)
SELECT t.id, 'Supply Chain Engineer', 'Austin, TX', false, 'FULL_TIME', 'RIQ-2010', true
FROM team t WHERE t.slug = 'manufacturing-operations';

-- Product & Deployment roles
INSERT INTO job_posting (team_id, title, location, is_remote, job_type, req_id, active)
SELECT t.id, 'Fleet Operations Engineer', NULL, true, 'FULL_TIME', 'RIQ-2011', true
FROM team t WHERE t.slug = 'product-deployment';

INSERT INTO job_posting (team_id, title, location, is_remote, job_type, req_id, active)
SELECT t.id, 'Deployment Engineer, Customer Reliability', 'Austin, TX', false, 'FULL_TIME', 'RIQ-2012', true
FROM team t WHERE t.slug = 'product-deployment';