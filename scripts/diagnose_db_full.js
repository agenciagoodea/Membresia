
const url = 'https://wggjwoglmcmzulplcged.supabase.co/rest/v1/churches?select=*';
const key = 'sb_publishable_H0Z5VavSF8xGiKNWcdFYWQ_qTULgdT5';

async function diagnose() {
	try {
		const response = await fetch(url, {
			headers: {
				'apikey': key,
				'Authorization': 'Bearer ' + key
			}
		});
		const churches = await response.json();
		console.log('CHURCHES_ALL:' + JSON.stringify(churches));
	} catch (error) {
		console.error('DIAGNOSE_ERROR:', error);
	}
}

diagnose();
