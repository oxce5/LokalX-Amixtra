{ pkgs, lib, config, inputs, ... }:

{
  # https://devenv.sh/basics/
  env.GREET = "devenv";

  # https://devenv.sh/processes/
  # processes.cargo-watch.exec = "cargo-watch";
  languages.javascript = {
    enable = true;
    npm = {
      enable = true;
      install.enable = true;
    };
  };

  services = {
    postgres = {
      enable = true;
      # Optional: set version, database name, user, password
      package = pkgs.postgresql_15;
      initialDatabases = [{ name = "appdb"; }];
      initialScript = ''
        CREATE USER appuser WITH PASSWORD 'apppass';
        GRANT ALL PRIVILEGES ON DATABASE appdb TO appuser;

        \connect appdb
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(32) NOT NULL UNIQUE,
          email VARCHAR(255) NOT NULL UNIQUE,
          password_hash TEXT NOT NULL,
          display_name VARCHAR(64),
          bio TEXT,
          avatar_url TEXT,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
        '';
    };
  };

  # Optionally, add CLI tools
  packages = with pkgs; [
    git
    postgresql_15
    pgcli # Optional: nice interactive CLI
  ];

  # Shell environment variables
  env = {
    PGUSER = "appuser";
    PGDATABASE = "appdb";
    PGHOST = "localhost";
    PGPORT = lib.mkForce "5432";
  };


  # https://devenv.sh/scripts/
  scripts.hello.exec = ''
    echo hello from $GREET
  '';

  enterShell = ''
    hello
    git --version
  '';

  # https://devenv.sh/tasks/
  # tasks = {
  #   "myproj:setup".exec = "mytool build";
  #   "devenv:enterShell".after = [ "myproj:setup" ];
  # };

  # https://devenv.sh/tests/
  enterTest = ''
    echo "Running tests"
    git --version | grep --color=auto "${pkgs.git.version}"
  '';

  # https://devenv.sh/git-hooks/
  # git-hooks.hooks.shellcheck.enable = true;

  # See full reference at https://devenv.sh/reference/options/
}
