const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wggjwoglmcmzulplcged.supabase.co';
const supabaseAnonKey = 'sb_publishable_H0Z5VavSF8xGiKNWcdFYWQ_qTULgdT5';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkColumns() {
  const { data, error } = await supabase.from('members').select('*').eq('email', 'arao@mircentrosul.com').single();
  if (error) {
    console.error('Error fetching member:', error);
    return;
  }
  if (data) {
    console.log('Member data for Arão:', JSON.stringify(data, null, 2));
  } else {
    console.log('Member not found.');
  }
}

checkColumns();
