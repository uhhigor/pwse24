{
  description = "NodeJS dev Env ";
  nixConfig.bash-prompt = "[ NodeJS ]-> ";
  inputs = { nixpkgs.url = "github:nixos/nixpkgs/23.11"; };

  outputs = { self, nixpkgs }:
    let
    pkgs = nixpkgs.legacyPackages.x86_64-linux.pkgs;
    libs = ps: with ps; 
      [
      ];
    in
      {
        devShells.x86_64-linux.default = pkgs.mkShell {
          name = "NodeJS";
          buildInputs = with pkgs; [
            nodejs_21
#            nodePackages.ts-node
#            typescript
            
          ];
        };

      };
}
