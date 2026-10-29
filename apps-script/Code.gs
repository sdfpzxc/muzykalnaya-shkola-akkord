// Код приёмника заявок (ТЗ раздел 6.2)
const SHEET_ID = '1ze-oa8-WpxGMRNj676tqbwHazcXYZAAoaRNMx5L7ZaA'; 
const SHEET_NAME = 'Sheet1'; 

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return response({ ok: false, error: 'No data' });
    }
    
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Валидация
    if (!data.name || !data.phone || !data.instrument || !data.level || !data.preferred_time) {
      return response({ ok: false, error: 'Missing required fields' });
    }
    
    const digits = data.phone.replace(/\D/g, '');
    if (digits.length !== 11 || digits[0] !== '7') {
      return response({ ok: false, error: 'Invalid phone format' });
    }
    
    if (data.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
      return response({ ok: false, error: 'Invalid email format' });
    }
    
    // Защита от дублей
    const existingIds = sheet.getRange('A:A').getValues().flat();
    if (existingIds.includes(data.request_id)) {
      return response({ ok: false, error: 'Duplicate request_id' });
    }
    
    // Запись в таблицу
    const row = [
      data.request_id,
      new Date(),
      data.name,
      data.phone,
      data.email || '',
      data.instrument,
      data.level,
      data.preferred_time,
      data.utm_source || 'direct',
      data.utm_medium || 'none',
      data.utm_campaign || 'not_set',
      data.utm_content || 'not_set',
      'new'
    ];
    
    sheet.appendRow(row);
    return response({ ok: true });
    
  } catch (err) {
    return response({ ok: false, error: err.toString() });
  }
}

// ТОЛЬКО ОДНА ФУНКЦИЯ RESPONSE
function response(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}