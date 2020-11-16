using System;
using Newtonsoft.Json;
using System.Data.SqlClient;

namespace player
{
    public class Player
    {
        [JsonProperty("UserName")]
        public string UserName { get; set; }

        public Player(string username){
            this.UserName = username;
        }

        public Player(){
            this.UserName = "";
        }

        public Player doesExist(PlayerSelection p){
            string connectionString = @"Data Source=rpsdp.ctvssf2oqpbl.us-east-1.rds.amazonaws.com;
            Initial Catalog=TEST;User ID=admin; Password=kereneritrea";
            SqlConnection con = new SqlConnection(connectionString);
            
            string queryString = "SELECT * FROM Player WHERE userName = @user";

            SqlCommand command = new SqlCommand(queryString, con);
            command.Parameters.AddWithValue("@user", p.UserName);
            con.Open();
            Player found = null;

            using(SqlDataReader reader = command.ExecuteReader()){
                while(reader.Read())
                {
                   found = new Player(reader[0].ToString());
           
                }
            }

            return found; 
        }

        public void addPlayer(PlayerSelection p){
            string connectionString = @"Data Source=rpsdp.ctvssf2oqpbl.us-east-1.rds.amazonaws.com;
            Initial Catalog=TEST;User ID=admin; Password=kereneritrea";
            SqlConnection con = new SqlConnection(connectionString);

            string queryString = "INSERT INTO Player (userName) VALUES (@user)"; 
            
            SqlCommand command = new SqlCommand(queryString, con);
            command.Parameters.AddWithValue("@user", p.UserName);
            con.Open();
            command.ExecuteNonQuery();
        }
    }
}