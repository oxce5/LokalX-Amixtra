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

  # TODO remove these, we will be moving to cloud
  services = {
    mysql = {
      enable = true;
      package = pkgs.mysql80;
      initialDatabases = [{ name = "appdb"; }];
      ensureUsers = [
      {
        name = "userManager";
        password = "test";
        ensurePermissions = {
          "userManager*" = "ALL PRIVILEGES";
        };
      }
      # {
      #   name = "postmanager";
      #   password = "test";
      # }
      # {
      #   name = "messagemanager";
      #   password = "test";
      # }
      ];
    };
    rabbitmq = {
      enable = true;
      port = 5672;
      managementPlugin= {
        enable = true;
        port = 15672;
      };
    };
  };

  # Optionally, add CLI tools
  packages = with pkgs; [
    git
    mycli # 
  ];

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
