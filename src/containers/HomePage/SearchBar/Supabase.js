const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ivtusicmgyifylfrmphf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2dHVzaWNtZ3lpZnlsZnJtcGhmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NTI2MTQ2OSwiZXhwIjoyMDEwODM3NDY5fQ.R3irmhHrYctmXdTbzEVvNtempnWmCJp39Tq1g5bxjtw';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;