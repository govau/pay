defmodule PayGovAu.Model.CreateErrorResponseTest do
  use ExUnit.Case

  test "decodes metadata" do
    mod =
      Poison.decode!(~s({ "errors": { "a": "b", "c": 6 } }),
        as: %PayGovAu.Model.CreateErrorResponse{}
      )

    assert mod.errors == %{"a" => "b", "c" => 6}
  end
end
