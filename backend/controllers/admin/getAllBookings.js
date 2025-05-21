const pool = require("../../config/db");

exports.getAllBookings = async (req, res) => {
  try {
    const { date = 'asc', venueName, district, status } = req.query;

    // Dinamik ORDER BY ni xavfsiz tarzda aniqlash
    const order = (date.toLowerCase() === 'desc') ? 'DESC' : 'ASC';

    // Shartlarni dinamik qurish
    let whereClauses = [];
    let values = [];
    let index = 1;

    if (venueName) {
      whereClauses.push(`v.name ILIKE $${index}`);
      values.push(`%${venueName}%`);
      index++;
    }

    if (district) {
      whereClauses.push(`v.district_id = $${index}`);
      values.push(district);
      index++;
    }

    if (status) {
      whereClauses.push(`b.status = $${index}`);
      values.push(status);
      index++;
    }

    const whereSQL = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const query = `
      SELECT b.id, v.name, v.district_id, b.reservation_date, b.guest_count, 
             u.firstname, u.lastname, u.phone_number, b.status, d.name AS district_name
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN venues v ON b.venue_id = v.id
      INNER JOIN district d ON v.district_id = d.id
      ${whereSQL}
      ORDER BY b.reservation_date ${order};
    `;

    const bookings = await pool.query(query, values);

    res.status(200).json(bookings.rows);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
