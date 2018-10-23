CREATE TABLE Asset_Classes (
	id INTEGER PRIMARY KEY IDENTITY (1,1),
	[name] NVARCHAR,
	description NVARCHAR,
	source_id INTEGER UNIQUE,
	last_updated DATETIME DEFAULT (null) );

CREATE TABLE Fields (
	id INTEGER PRIMARY KEY IDENTITY (1,1),
	[name] NVARCHAR,
	description NVARCHAR,
	value_type NVARCHAR,
	units NVARCHAR,
	allow_multiple_values BIT,
	allow_new_values BIT,
	last_updated DATETIME DEFAULT (null),
	source_id INTEGER UNIQUE,
	default_values TEXT);

CREATE TABLE Asset_Class_Fields (
	id INTEGER PRIMARY KEY IDENTITY (1,1),
	asset_class_id INTEGER,
	field_id INTEGER,
	[priority] NVARCHAR,
	[required] BIT,
	editable BIT,
	last_updated DATETIME DEFAULT (null) ,
	source_id INTEGER UNIQUE,
	foreign key(asset_class_id) references asset_classes(source_id), 
	foreign key(field_id) references fields(source_id));

CREATE TABLE Users (
	id INTEGER PRIMARY KEY IDENTITY (1,1),
	email_address NVARCHAR,
	[password] NVARCHAR,
	url NVARCHAR,
	source_id INTEGER UNIQUE,
	last_updated DATETIME);

CREATE TABLE Audits (
	id INTEGER PRIMARY KEY IDENTITY (1,1),
	[name] nvarchar(255) DEFAULT (null) ,
	[description] nvarchar(255) DEFAULT (null) ,
	due_date DateTime DEFAULT (null) ,
	last_upload DATETIME,
	last_download DATETIME,
	source_id INTEGER UNIQUE,
	user_id INTEGER,
	last_updated DATETIME DEFAULT (null),
	foreign key(user_id) references users(source_id));


CREATE TABLE Audit_Asset_Class_Fields (
	id INTEGER PRIMARY KEY IDENTITY (1,1),
	audit_id INTEGER,
	asset_class_field_id INTEGER DEFAULT (null),
	[required] BIT,
	editable BIT,
	last_updated	DATETIME DEFAULT (null),
	source_id INTEGER UNIQUE,
	foreign key(audit_id) references audits(source_id),
	foreign key(asset_class_field_id) references asset_class_fields(source_id));

CREATE TABLE Files (
	id INTEGER PRIMARY KEY IDENTITY (1,1),
	description VARCHAR,
	file_name VARCHAR DEFAULT (null),
	data VARBINARY(MAX), 
	source_id INTEGER UNIQUE, 
	last_updated DATETIME);

CREATE TABLE Settings (
	id INTEGER PRIMARY KEY IDENTITY (1,1),
	name VARCHAR,
	value TEXT DEFAULT (null));

CREATE TABLE Locations (
	id INTEGER PRIMARY KEY IDENTITY (1,1),
	audit_id INTEGER,
	name VARCHAR,
	description VARCHAR,
	parent_location_id INTEGER,
	last_updated DATETIME DEFAULT (null) ,
	source_id INTEGER UNIQUE,
	editable BIT,
	existType VARCHAR, 
	audit_completed BIT,
	lft INTEGER, 
	rgt INTEGER,
	foreign key(parent_location_id) references locations(source_id) On Delete NO Action,
	foreign key(audit_id) references audits(source_id));


CREATE TABLE Location_Asset_Classes (
	id INTEGER PRIMARY KEY IDENTITY (1,1),
	location_id INTEGER,
	asset_class_id INTEGER,
	last_updated DATETIME DEFAULT (null) ,
	source_id INTEGER,
	foreign key(asset_class_id) references asset_classes(source_id),
	foreign key(location_id) references locations(source_id));

CREATE TABLE Location_Attributes (
	id INTEGER PRIMARY KEY IDENTITY (1,1),
	field_id INTEGER,
	location_id INTEGER,
	value VARCHAR,
	last_updated DATETIME DEFAULT (null) ,
	source_id INTEGER, 
	foreign key(field_id) references fields(source_id),
	foreign key(location_id) references locations(source_id) On Delete Cascade);

CREATE TABLE Location_Fields (
	id INTEGER PRIMARY KEY IDENTITY (1,1),
	field_id INTEGER,
	audit_id INTEGER,
	required BIT,
	editable BIT,
	last_updated DATETIME DEFAULT (null) ,
	source_id INTEGER UNIQUE, foreign key(field_id) references fields(source_id),
	foreign key(audit_id) references audits(source_id));

CREATE TABLE Location_Files (
	id INTEGER PRIMARY KEY IDENTITY (1,1),
	location_id INTEGER,
	file_id INTEGER,
	last_updated DATETIME DEFAULT (null),
	source_id INTEGER,
	foreign key(location_id) references locations(source_id),
	foreign key(file_id) references files(source_id));



CREATE TABLE Equipment (
	id INTEGER PRIMARY KEY IDENTITY (1,1),
	audit_id INTEGER,
	name VARCHAR,
	description VARCHAR,
	parent_location_id INTEGER,
	parent_equipment_id INTEGER,
	last_updated DATETIME DEFAULT (null),
	source_id INTEGER UNIQUE,
	editable BIT,
	existType VARCHAR,
	audit_completed BIT,
	lft INTEGER,
	rgt INTEGER,
	foreign key(parent_location_id) references locations(source_id) On Delete NO Action,
	foreign key(parent_equipment_id) references equipment(source_id) On Delete NO Action,
	foreign key(audit_id) references audits(source_id));

CREATE TABLE Equipment_Asset_Classes (
	id INTEGER PRIMARY KEY IDENTITY (1,1),
	equipment_id INTEGER,
	asset_class_id INTEGER,
	last_updated DATETIME DEFAULT (null) ,
	source_id INTEGER,
	foreign key(asset_class_id) references asset_classes(source_id),
	foreign key(equipment_id) references equipment(source_id));

CREATE TABLE Equipment_Attributes (
	id INTEGER PRIMARY KEY IDENTITY (1,1),
	field_id INTEGER,
	equipment_id INTEGER,
	value NVARCHAR,
	last_updated DATETIME DEFAULT (null) ,
	source_id INTEGER, 
	foreign key(field_id) references fields(source_id),
	foreign key(equipment_id) references equipment(source_id) On Delete Cascade);

CREATE TABLE Equipment_Fields (
	id INTEGER PRIMARY KEY IDENTITY (1,1),
	field_id INTEGER,
	audit_id INTEGER,
	required BIT,
	editable BIT,
	last_updated DATETIME DEFAULT (null) ,
	source_id INTEGER UNIQUE,
	foreign key(field_id) references fields(source_id),
	foreign key(audit_id) references audits(source_id));

CREATE TABLE Equipment_Files (
	id INTEGER PRIMARY KEY IDENTITY (1,1),
	equipment_id INTEGER,
	file_id INTEGER,
	last_updated DATETIME DEFAULT (null),
	source_id INTEGER, 
	foreign key(equipment_id) references equipment(source_id),
	foreign key(file_id) references files(source_id));




