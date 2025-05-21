const pool = require("../../config/db");

exports.getVenueOwner = async (req, res) => {
  try {
    // Fetch the venue owner from the database
    const owners = await pool.query(
      `select id, firstname, lastname from users where role = 'owner'` // Corrected the SQL query
    );
    const venueOwner = await pool.query(
      `select u.firstname, u.lastname, v.name from venues v
      inner join users u on v.owner_id = u.id `
    );

    // Check if the venue owner exists
    if (venueOwner.rows.length === 0) {
      return res.status(404).json({ error: "To'yxona egalari topilmadi" });
    }

    // Return the venue owner details
    return res.status(200).json({
      message: "To'yxona egalari",
      owners: owners.rows,
      venueOwners: venueOwner.rows,
    });
  } catch (error) {
    console.error('Error fetching venue owner:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}